/**
 * RendererType.ts
 *
 * Renderer types for the Chladni visualization.
 */

export const RendererType = {
  CANVAS: "canvas",
  WEBGL: "webgl",
} as const;

export type RendererType = (typeof RendererType)[keyof typeof RendererType];
