import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Simple splash SVG placeholder for brands
const splashSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#1a1a2e"/>
  <text x="300" y="200" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Loading...</text>
</svg>`;

// Brands that SceneryStack might request splash images for
const brands = ["made-with-scenerystack", "adapted-from-phet", "phet"];

/** Generates brand splash SVGs during build. */
function generateSplashPlugin(): Plugin {
  return {
    name: "generate-splash-svgs",
    async writeBundle(options): Promise<void> {
      const outDir = options.dir || "dist";
      for (const brand of brands) {
        const dir = join(outDir, "brand", brand, "images");
        await mkdir(dir, { recursive: true });
        await writeFile(join(dir, "splash.svg"), splashSvg);
      }
    },
  };
}

/**
 * Security headers required for:
 *  - COOP/COEP: SharedArrayBuffer support
 *  - CSP: restrict resource loading to same-origin + known blob/data exceptions
 *  - X-Content-Type-Options: prevent MIME sniffing
 *  - X-Frame-Options: prevent clickjacking (belt-and-suspenders alongside frame-ancestors)
 */
const securityHeaders: Record<string, string> = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Content-Security-Policy": [
    "default-src 'self'",
    // 'unsafe-eval' is required for SceneryStack query parameter parsing
    "script-src 'self' 'unsafe-eval'",
    "worker-src blob: 'self'",
    // Inline styles are set via element.style / cssText throughout the UI layer
    "style-src 'self' 'unsafe-inline'",
    // data: for icons
    "img-src 'self' data:",
    "media-src 'self' blob:",
    // blob: for fetch inside workers
    "connect-src 'self' blob:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

// https://vite.dev/config/
export default defineConfig({
  // So the build can be served from an arbitrary path
  base: "./",
  // Note: We intentionally do NOT define phet.chipper.packageObject here.
  // The inline script in index.html sets this at runtime before modules load,
  // which is required for proper initialization order with SceneryStack.
  build: {
    // Requires Vite 8+ / esbuild ≥0.24. Run `npm ci` if build errors on ES2024.
    target: "es2024",
    rollupOptions: {
      output: {
        // Split scenerystack into its own chunk for better caching and to address chunk size warning
        manualChunks: (id) => (id.includes("node_modules/scenerystack") ? "scenerystack" : undefined),
      },
    },
  },
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
  plugins: [
    generateSplashPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icons/apple-touch-icon.png"],
      manifest: {
        name: "Resonance",
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case keys
        short_name: "Resonance",
        description:
          "Interactive simulation of resonance in driven oscillating systems. Visualizes driven mass-spring systems and Chladni plate patterns.",
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case keys
        theme_color: "#1a1a2e",
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case keys
        background_color: "#000000",
        display: "standalone",
        orientation: "landscape",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
      },
    }),
  ],
});
