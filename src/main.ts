/**
 * main.ts
 *
 * Entry point for the simulation. Initializes SceneryStack, creates the
 * screen, and starts the main event loop.
 *
 * !! CRITICAL IMPORT ORDER !!
 * brand.js MUST be the first import. It triggers the full bootstrap chain:
 *
 *   brand.ts → splash.ts → assert.ts → init.ts
 *
 * SceneryStack requires this exact load order. Never reorder these imports.
 */

// brand.js MUST be first — triggers: init.ts → assert.ts → splash.ts → brand.ts
import "./brand.js";

import { onReadyToLaunch, PreferencesModel, Sim } from "scenerystack/sim";
import { Tandem } from "scenerystack/tandem";
import { ChladniScreen } from "./chladni-patterns/ChladniScreen.js";
import { ResonanceStrings } from "./i18n/ResonanceStrings.js";
import { MultipleOscillatorsScreen } from "./multiple-oscillators/MultipleOscillatorsScreen.js";
import { PhaseAnalysisScreen } from "./phase-analysis/PhaseAnalysisScreen.js";
import { ResonancePreferencesModel } from "./preferences/ResonancePreferencesModel.js";
import { ResonancePreferencesNode } from "./preferences/ResonancePreferencesNode.js";
import { SingleOscillatorScreen } from "./single-oscillator/SingleOscillatorScreen.js";

onReadyToLaunch(() => {
  const resonancePreferences = new ResonancePreferencesModel();

  const simOptions = {
    webgl: true,
    hasKeyboardHelpContent: true,
    preferencesModel: new PreferencesModel({
      visualOptions: {
        supportsProjectorMode: true,
        supportsInteractiveHighlights: true,
      },
      audioOptions: {
        supportsVoicing: true,
        supportsSound: true,
      },
      inputOptions: {
        supportsGestureControl: false,
      },
      localizationOptions: {
        supportsDynamicLocale: true,
        includeLocalePanel: true,
      },
      simulationOptions: {
        customPreferences: [
          {
            createContent: (_tandem: Tandem) => new ResonancePreferencesNode(resonancePreferences),
          },
        ],
      },
    }),
  };

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

  const sim = new Sim(ResonanceStrings.titleStringProperty, screens, simOptions);

  sim.start();
});
