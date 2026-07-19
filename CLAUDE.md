# CLAUDE.md — Resonance

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

Interactive resonance simulation: driven mass-spring systems and Chladni plate patterns.

**Four screens** (first three share `BaseOscillatorScreenModel` / `BaseOscillatorScreenView`):

1. **Single Oscillator** — driven damped harmonic oscillator
2. **Multiple Oscillators** — 1–10 oscillators with different natural frequencies
3. **Phase Analysis** — phase lag and phase-space plots
4. **Chladni Patterns** — 2D plate modes, particles on nodal lines

## Key files

| Task | Files |
|---|---|
| Oscillator physics | `src/common/model/ResonanceModel.ts`, `ResonanceConstants.ts` |
| ODE solvers | `src/common/model/{RungeKutta,AdaptiveRK45,Analytical}Solver.ts`, `ODESolver.ts` |
| Frequency sweep | `FrequencySweepController.ts`, `SweepButton.ts` |
| Trace / grid | `OscillatorTraceNode.ts`, `TraceDataModel.ts` |
| Phase-space graph | `src/common/view/graph/ConfigurableGraph.ts`, `PlottableProperty.ts` |
| Chladni | `src/chladni-patterns/model/`, `src/chladni-patterns/view/` |
| Colors / strings | `ResonanceColors.ts`, `src/i18n/strings_{en,es,fr}.json` |
| New oscillator screen | Extend base model/view; register in `main.ts` |

## Resonance-specific pitfalls

- **Circular property updates** — use `CircularUpdateGuard` when syncing related properties (e.g. m ↔ cm)
- **Coordinates** — model Y is up; view Y is down; use `ModelViewTransform2`
- **Units** — driving amplitude stored in meters, displayed in cm; check `ResonanceConstants` for ranges
- **Solvers** — RK4 default (1 ms steps); sub-step callbacks feed smooth phase-space graphs
- **Audio teardown timer (allowed exception)** — `chladni-patterns/view/ResonanceSonification.ts` uses a raw `setTimeout(…, 30 ms)` to stop and disconnect the Web Audio oscillator *after* a `linearRampToValueAtTime` gain fade. This intentionally runs on wall-clock time, not `stepTimer`, so the click-free fade-out completes even while the sim clock is paused — the one documented exception to the "no `setTimeout`" rule (CONVENTIONS.md §2.9 / §7).
- **Progressive curve precompute (allowed exception)** — `chladni-patterns/model/ResonanceCurveCalculator.ts` precomputes the resonance-strength curve (`TOTAL_CURVE_SAMPLES`) in chunks across `requestAnimationFrame` callbacks, with a `computationVersion` guard so a newer request supersedes the in-flight one and `cancelProgressiveComputation()` aborts via `cancelAnimationFrame`. This is a deliberate non-blocking *background precompute*, not a physics step: it is driven by rAF rather than `stepTimer` so it runs at the browser frame rate independent of sim play/pause and never couples to `step(dt)`. It produces a cached lookup table; the sim never reads partial results (the `isComputationValid` flag gates use). A second documented exception to the "no raw rAF in the model" rule (CONVENTIONS.md §2.9 / §7).

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/Baton/blob/main/ACCESSIBILITY.md).
`BaseOscillatorScreenView` registers `OscillatorScreenSummaryContent` (shared by the three
oscillator screens) and `ChladniScreenView` registers `ChladniScreenSummaryContent`; both set an
explicit `pdomOrder` and use live current-details derived from the model. Per-control
`accessibleName`/`accessibleHelpText` and screen-summary strings live under `resonance.a11y` in
each locale JSON, exposed via `StringManager.getA11yStrings()`.

## Compliance carve-outs

- **Nested constants:** shared + per-screen constants under `src/common/` / screen folders.
- **Hardcoded colors:** near-invisible `rgba(0,0,0,0.01)` hit-target fill in `ChladniScreenView.ts` (interaction surface, not themed chrome).

## Testing

Fleet-standard Vitest layout:

| Path | Purpose |
|---|---|
| `vitest.config.ts` | Test environment + `setupFiles` when present; `execArgv: ["--expose-gc"]` with memory-leak suite |
| `tests/setup.ts` | Canvas / AudioContext mocks + `init({ name: "…" })` before SceneryStack imports (when required) |
| `tests/**/*.test.ts` | Model/physics unit tests — mirror `src/` under `tests/` |
| `tests/memory-leak.test.ts` | WeakRef + `forceGC` dispose regression (fleet pattern) |

- Put unit tests only under root `tests/` (never co-locate or use `__tests__/`).
- Run `npm test`. CI runs the suite when a `test` script is present.
- Expand `memory-leak.test.ts` for components that add/remove nodes or link Properties at runtime (see OpticsLab).

## Documentation

| File | Contents |
|---|---|
| `doc/model.md` | Physics equations and educational guide |
| `doc/implementation-notes.md` | Architecture and design patterns |

## Sim-specific commands

```bash
npm test                  # Vitest unit tests
npm run test:fuzz         # Playwright fuzz (60s default)
npm run test:fuzz:quick   # 30s fuzz
npm run test:fuzz:long    # 5 min fuzz
```

Fuzz env: `FUZZ_SEED`, `FUZZ_DURATION`.
