/**
 * ResonanceScreenIcons.ts
 *
 * Programmatic home-screen / navigation-bar icons for the four Resonance screens.
 * Drawn on the standard PhET 548 × 373 canvas using ResonanceColors.
 *
 *   Single Oscillator    — one driven spring-mass.
 *   Multiple Oscillators — three coupled spring-masses.
 *   Phase Analysis       — two phase-offset sine traces.
 *   Chladni Patterns     — square plate with nodal-line particles.
 */
import { Shape } from "scenerystack/kite";
import { Circle, Line, Node, Path, Rectangle } from "scenerystack/scenery";
import { ScreenIcon } from "scenerystack/sim";
import ResonanceColors from "../ResonanceColors.js";

const W = 548;
const H = 373;

function background(fill = ResonanceColors.backgroundProperty): Rectangle {
  return new Rectangle(0, 0, W, H, { fill });
}

function iconFrom(content: Node, fill = ResonanceColors.backgroundProperty): ScreenIcon {
  return new ScreenIcon(content, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1,
    fill,
  });
}

function zigZagSpring(x: number, y0: number, y1: number, halfWidth: number, coils: number): Path {
  const shape = new Shape().moveTo(x, y0);
  const usable = y1 - y0;
  for (let i = 0; i < coils; i++) {
    const t0 = (i + 0.25) / coils;
    const t1 = (i + 0.75) / coils;
    shape.lineTo(x + halfWidth, y0 + t0 * usable);
    shape.lineTo(x - halfWidth, y0 + t1 * usable);
  }
  shape.lineTo(x, y1);
  return new Path(shape, {
    stroke: ResonanceColors.springProperty,
    lineWidth: 5,
    lineCap: "round",
    lineJoin: "round",
  });
}

function mass(cx: number, cy: number, r = 28): Circle {
  return new Circle(r, {
    fill: ResonanceColors.massProperty,
    stroke: ResonanceColors.massStrokeProperty,
    lineWidth: 3,
    centerX: cx,
    centerY: cy,
  });
}

function driver(x: number, y: number, w: number, h: number): Rectangle {
  return new Rectangle(x, y, w, h, 6, 6, {
    fill: ResonanceColors.driverFillProperty,
    stroke: ResonanceColors.driverStrokeProperty,
    lineWidth: 3,
  });
}

function sineTrace(
  x0: number,
  x1: number,
  y0: number,
  amp: number,
  cycles: number,
  phase: number,
  stroke: unknown,
): Path {
  const shape = new Shape();
  const samples = 56;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = x0 + t * (x1 - x0);
    const y = y0 + amp * Math.sin(phase + t * cycles * Math.PI * 2);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  return new Path(shape, {
    stroke: stroke as never,
    lineWidth: 5,
    lineCap: "round",
    lineJoin: "round",
  });
}

export function createSingleOscillatorIcon(): ScreenIcon {
  const cx = W / 2;
  const top = driver(cx - 70, 40, 140, 36);
  const spring = zigZagSpring(cx, 76, 220, 28, 7);
  const m = mass(cx, 255);
  return iconFrom(new Node({ children: [background(), top, spring, m] }));
}

export function createMultipleOscillatorsIcon(): ScreenIcon {
  const x0 = W / 2 - 150;
  const x1 = W / 2;
  const x2 = W / 2 + 150;
  const h0 = 210;
  const h1 = 250;
  const h2 = 190;
  return iconFrom(
    new Node({
      children: [
        background(),
        driver(60, 36, W - 120, 32),
        zigZagSpring(x0, 68, h0 - 30, 22, 6),
        mass(x0, h0, 24),
        zigZagSpring(x1, 68, h1 - 30, 22, 6),
        mass(x1, h1, 24),
        zigZagSpring(x2, 68, h2 - 30, 22, 6),
        mass(x2, h2, 24),
        new Line(x0 + 24, h0, x1 - 24, h1, {
          stroke: ResonanceColors.connectionRodMarkerProperty,
          lineWidth: 4,
        }),
        new Line(x1 + 24, h1, x2 - 24, h2, {
          stroke: ResonanceColors.connectionRodMarkerProperty,
          lineWidth: 4,
        }),
      ],
    }),
  );
}

export function createPhaseAnalysisIcon(): ScreenIcon {
  const chart = new Rectangle(50, 50, W - 100, H - 100, 10, 10, {
    fill: ResonanceColors.graphBackgroundProperty,
    stroke: ResonanceColors.panelStrokeProperty,
    lineWidth: 3,
  });
  const midY = H / 2;
  return iconFrom(
    new Node({
      children: [
        background(),
        chart,
        new Line(70, midY, W - 70, midY, { stroke: ResonanceColors.gridLinesProperty, lineWidth: 2 }),
        sineTrace(80, W - 80, midY, 70, 2, 0, ResonanceColors.inPhaseProperty),
        sineTrace(80, W - 80, midY, 70, 2, 1.2, ResonanceColors.outOfPhaseProperty),
      ],
    }),
  );
}

export function createChladniIcon(): ScreenIcon {
  const size = 260;
  const x = (W - size) / 2;
  const y = (H - size) / 2;
  const plate = new Rectangle(x, y, size, size, 8, 8, {
    fill: ResonanceColors.chladniBackgroundProperty,
    stroke: ResonanceColors.chladniPlateBorderProperty,
    lineWidth: 4,
  });
  const particles: Circle[] = [];
  // Approximate a cross + diamond nodal pattern with particle dots.
  const step = 18;
  for (let i = 0; i <= size; i += step) {
    particles.push(
      new Circle(4, {
        fill: ResonanceColors.chladniParticleProperty,
        centerX: x + i,
        centerY: y + size / 2,
      }),
      new Circle(4, {
        fill: ResonanceColors.chladniParticleProperty,
        centerX: x + size / 2,
        centerY: y + i,
      }),
    );
  }
  for (let t = 0; t <= 1; t += 0.07) {
    particles.push(
      new Circle(3.5, {
        fill: ResonanceColors.chladniParticleProperty,
        centerX: x + t * size,
        centerY: y + t * size,
      }),
      new Circle(3.5, {
        fill: ResonanceColors.chladniParticleProperty,
        centerX: x + t * size,
        centerY: y + (1 - t) * size,
      }),
    );
  }
  return iconFrom(new Node({ children: [background(ResonanceColors.chladniBackgroundProperty), plate, ...particles] }));
}
