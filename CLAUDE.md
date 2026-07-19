# CLAUDE.md — Resonance

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

Interactive resonance simulation: driven mass-spring systems and Chladni plate patterns.

Educator physics: [`doc/model.md`](doc/model.md). Architecture: [`doc/implementation-notes.md`](doc/implementation-notes.md).

| Screen | Folder | Focus |
|---|---|---|
| Single Oscillator | `src/single-oscillator/` | Driven damped harmonic oscillator |
| Multiple Oscillators | `src/multiple-oscillators/` | 1–10 oscillators with different natural frequencies |
| Phase Analysis | `src/phase-analysis/` | Phase lag and phase-space plots |
| Chladni Patterns | `src/chladni-patterns/` | 2D plate modes, particles on nodal lines |

First three screens share `BaseOscillatorScreenModel` / `BaseOscillatorScreenView`.

## Key files

| Area | Location |
|---|---|
| Oscillator physics | `src/common/model/ResonanceModel.ts`, `BaseModel.ts`; `src/ResonanceConstants.ts` |
| ODE solvers | `src/common/model/{RungeKutta,AdaptiveRK45,Analytical}Solver.ts`, `ODESolver.ts` |
| Frequency sweep | `FrequencySweepController.ts`, `SweepButton.ts` |
| Trace / graph | `OscillatorTraceNode.ts`, `TraceDataModel.ts`, `src/common/view/graph/ConfigurableGraph.ts` |
| Chladni | `src/chladni-patterns/model/`, `src/chladni-patterns/view/`, `ResonanceCurveCalculator.ts`, `ResonanceSonification.ts` |
| Colors / i18n | `ResonanceColors.ts`, `src/i18n/strings_{en,es,fr}.json`, `StringManager.ts` |

## Model

- **Oscillators:** RK4 default (1 ms steps); sub-step callbacks feed smooth phase-space graphs.
  Driving amplitude stored in meters, displayed in cm — check `ResonanceConstants` for ranges.
- **Coordinates:** model Y is up; view Y is down; use `ModelViewTransform2`.
- **Property sync:** use `CircularUpdateGuard` when syncing related properties (e.g. m ↔ cm).
- **Chladni sonification (allowed exception):** `ResonanceSonification.ts` uses a raw
  `setTimeout(…, 30 ms)` after a gain fade — wall-clock teardown, not `stepTimer`, so fade-out
  completes while paused (CONVENTIONS.md §2.9 / §7).
- **Progressive curve precompute (allowed exception):** `ResonanceCurveCalculator.ts` chunks
  resonance-strength lookup across `requestAnimationFrame` with a `computationVersion` guard —
  background precompute, not physics stepping (CONVENTIONS.md §2.9 / §7).

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/Baton/blob/main/ACCESSIBILITY.md).
`BaseOscillatorScreenView` registers `OscillatorScreenSummaryContent` (shared by the three
oscillator screens); `ChladniScreenView` registers `ChladniScreenSummaryContent`. Both set explicit
`pdomOrder` and live current-details derived from the model. Per-control `accessibleName` /
`accessibleHelpText` and screen-summary strings live under `resonance.a11y` in each locale JSON,
via `StringManager.getA11yStrings()`.

## Compliance carve-outs

- **Root constants:** `src/ResonanceConstants.ts`; domain-specific `ChladniConstants` stays under chladni-patterns.
- **Hardcoded colors:** near-invisible `rgba(0,0,0,0.01)` hit-target fill in `ChladniScreenView.ts`
  (interaction surface, not themed chrome).

## Testing

Fleet-standard Vitest layout (`happy-dom`, `tests/setup.ts`, `execArgv: ["--expose-gc"]`):

| Path | Purpose |
|---|---|
| `tests/common/model/ResonanceModel.test.ts` | Core oscillator model |
| `tests/common/model/BaseModel.test.ts` | Shared model base |
| `tests/common/model/ODESolvers.test.ts` | Numerical integrators |
| `tests/common/model/AnalyticalSolver.test.ts` | Analytic reference paths |
| `tests/common/model/SolverType.test.ts` | Solver enumeration |
| `tests/common/model/ResonatorConfigMode.test.ts` | Resonator configuration |
| `tests/common/util/CircularUpdateGuard.test.ts` | Property sync guard |
| `tests/common/util/ListenerTracker.test.ts` | Listener lifecycle |
| `tests/common/ResonanceConstants.test.ts` | Constant ranges / conversions |
| `tests/common/ResonanceColors.test.ts` | Color profile registration |
| `tests/preferences/ResonancePreferencesModel.test.ts` | Preferences model |
| `tests/i18n/StringManager.test.ts` | String accessors |
| `tests/i18n/ResonanceStrings.test.ts` | Locale key parity |
| `tests/memory-leak.test.ts` | WeakRef + `forceGC` dispose regression |
| `tests/fuzz/fuzz.spec.ts` | Playwright fuzz smoke (optional; not default CI) |

Put unit tests only under root `tests/` (never co-locate or use `__tests__/`). Run `npm test`; CI
runs the suite when a `test` script is present.

## Commands

```bash
npm run lint && npm run check && npm run build && npm test
```

| Command | Description |
|---|---|
| `npm start` / `npm run dev` | Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run build:single` | Single-file build mode |
| `npm run check` | TypeScript (main + scripts + test projects) |
| `npm run lint` / `npm run fix` | Biome check / auto-fix |
| `npm test` | Vitest unit tests |
| `npm run test:coverage` | Vitest with coverage |
| `npm run test:fuzz` | Playwright fuzz (60s default) |
| `npm run test:fuzz:quick` | 30s fuzz |
| `npm run test:fuzz:long` | 5 min fuzz |
| `npm run icons` | Regenerate PWA icons |

Fuzz env: `FUZZ_SEED`, `FUZZ_DURATION`.

## Development notes

- **New oscillator screen:** extend `BaseOscillatorScreenModel` / `BaseOscillatorScreenView`;
  register in `main.ts`.
- **Graph layer:** `ConfigurableGraph` + `PlottableProperty` drive phase-space and trace displays.
- **PWA:** after `npm run build`, installable offline via Workbox (`dist/manifest.webmanifest`).
