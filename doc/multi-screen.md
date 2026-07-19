# Multi-Screen Simulations

Resonance is a **four-screen** driven-oscillator / Chladni sim. Screens have
independent models and share `ResonancePreferencesModel`. Screen **names** and
**icons** are set in each `*Screen.ts` (not in `main.ts`).

For pedagogy and architecture, see [model.md](./model.md) and
[implementation-notes.md](./implementation-notes.md).

---

## Screens in this sim

| Order | UI name | Folder | Screen class | Icon factory |
|---|---|---|---|---|
| 1 | Single Oscillator | `src/single-oscillator/` | `SingleOscillatorScreen` | `createSingleOscillatorIcon()` |
| 2 | Multiple Oscillators | `src/multiple-oscillators/` | `MultipleOscillatorsScreen` | `createMultipleOscillatorsIcon()` |
| 3 | Phase Analysis | `src/phase-analysis/` | `PhaseAnalysisScreen` | `createPhaseAnalysisIcon()` |
| 4 | Chladni Patterns | `src/chladni-patterns/` | `ChladniScreen` | `createChladniIcon()` |

```
main.ts
  ├─ SingleOscillatorScreen(preferences, { tandem })
  ├─ MultipleOscillatorsScreen(preferences, { tandem })
  ├─ PhaseAnalysisScreen(preferences, { tandem })
  └─ ChladniScreen(preferences, { tandem })
```

Locale names come from `ResonanceStrings.screens.*StringProperty` inside each
Screen’s `optionize` defaults (nested under the `resonance` package in
`strings_*.json`).

---

## Folder layout

```
src/
├─ common/
│   ├─ ResonanceScreenIcons.ts
│   ├─ model/
│   └─ view/   # BaseOscillatorScreenView, ResonanceKeyboardHelpContent, …
├─ single-oscillator/
│   ├─ SingleOscillatorScreen.ts
│   ├─ model/SingleOscillatorModel.ts
│   └─ view/
├─ multiple-oscillators/
│   ├─ MultipleOscillatorsScreen.ts
│   ├─ model/
│   └─ view/
├─ phase-analysis/
│   ├─ PhaseAnalysisScreen.ts
│   ├─ model/
│   └─ view/
└─ chladni-patterns/
    ├─ ChladniScreen.ts
    ├─ model/
    └─ view/
```

Icons live only in `src/common/ResonanceScreenIcons.ts`.

---

## Wiring in `main.ts` and `*Screen.ts`

```typescript
// src/main.ts
const resonancePreferences = new ResonancePreferencesModel();

const screens = [
  new SingleOscillatorScreen(resonancePreferences, {
    tandem: Tandem.ROOT.createTandem("singleOscillatorScreen"),
  }),
  new MultipleOscillatorsScreen(resonancePreferences, {
    tandem: Tandem.ROOT.createTandem("multipleOscillatorsScreen"),
  }),
  new PhaseAnalysisScreen(resonancePreferences, {
    tandem: Tandem.ROOT.createTandem("phaseAnalysisScreen"),
  }),
  new ChladniScreen(resonancePreferences, {
    tandem: Tandem.ROOT.createTandem("chladniPatternsScreen"),
  }),
];
```

```typescript
// e.g. src/single-oscillator/SingleOscillatorScreen.ts
import { createSingleOscillatorIcon } from "../common/ResonanceScreenIcons.js";
import { ResonanceStrings } from "../i18n/ResonanceStrings.js";

optionize<ScreenOptions, EmptySelfOptions, ScreenOptions>()(
  {
    name: ResonanceStrings.screens.singleOscillatorStringProperty,
    backgroundColorProperty: ResonanceColors.backgroundProperty,
    createKeyboardHelpNode: () => new ResonanceKeyboardHelpContent(),
    homeScreenIcon: createSingleOscillatorIcon(),
    navigationBarIcon: createSingleOscillatorIcon(),
  },
  options,
);
```

Constructor signature: `(preferencesModel, options)` — preferences first, then
Screen options (typically only `tandem` from `main.ts`).

---

## Home screen icons

### Fleet convention

```
src/common/ResonanceScreenIcons.ts
```

| Screen | Factory |
|---|---|
| Single Oscillator | `createSingleOscillatorIcon()` |
| Multiple Oscillators | `createMultipleOscillatorsIcon()` |
| Phase Analysis | `createPhaseAnalysisIcon()` |
| Chladni Patterns | `createChladniIcon()` |

Drawn on the PhET **548 × 373** canvas using `ResonanceColors` profile colors.

---

## Screen options reference

| Option | Type | Purpose |
|---|---|---|
| `name` | `ReadOnlyProperty<string>` | Localizable tab label (set in `*Screen.ts`) |
| `tandem` | `Tandem` | PhET-iO registration root |
| `backgroundColorProperty` | `TReadOnlyProperty<Color>` | Screen background |
| `createKeyboardHelpNode` | `() => Node` | Keyboard help |
| `homeScreenIcon` | `ScreenIcon` | Home-screen icon |
| `navigationBarIcon` | `ScreenIcon` | Nav-bar icon |

---

## Strings and accessibility

Screen titles: `resonance.screens.singleOscillator`, `multipleOscillators`,
`phaseAnalysis`, `chladniPatterns` (plus legacy keys `sim` / `chladni` in the
JSON). Prefer `ResonanceStrings.screens.*` as used by the Screen classes.

A11y and keyboard help are largely shared via `ResonanceKeyboardHelpContent`;
Chladni has additional strings under `resonance.chladni.a11y`.

---

## Adding another screen

1. Add keys under `resonance.screens` in every locale; surface them on
   `ResonanceStrings`.
2. Add `src/<name>/` with Screen, model, and view.
3. Add `create…Icon()` to `ResonanceScreenIcons.ts` and wire both icons +
   `name` in the new Screen’s `optionize` defaults.
4. Construct the screen in `main.ts` with `resonancePreferences` and a tandem.
