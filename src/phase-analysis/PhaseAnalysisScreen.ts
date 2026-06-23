/**
 * PhaseAnalysisScreen is the third screen of the simulation.
 * It demonstrates phase relationships in driven oscillators.
 */

import { type EmptySelfOptions, optionize } from "scenerystack/phet-core";
import { Screen, type ScreenOptions } from "scenerystack/sim";
import { ResonanceKeyboardHelpContent } from "../common/view/ResonanceKeyboardHelpContent.js";
import { ResonanceStrings } from "../i18n/ResonanceStrings.js";
import type { ResonancePreferencesModel } from "../preferences/ResonancePreferencesModel.js";
import ResonanceColors from "../ResonanceColors.js";
import { PhaseAnalysisModel } from "./model/PhaseAnalysisModel.js";
import { PhaseAnalysisScreenView } from "./view/PhaseAnalysisScreenView.js";

export class PhaseAnalysisScreen extends Screen<PhaseAnalysisModel, PhaseAnalysisScreenView> {
  public constructor(preferencesModel: ResonancePreferencesModel, options: ScreenOptions) {
    super(
      () => new PhaseAnalysisModel(preferencesModel),
      (model: PhaseAnalysisModel) => new PhaseAnalysisScreenView(model),
      optionize<ScreenOptions, EmptySelfOptions, ScreenOptions>()(
        {
          name: ResonanceStrings.screens.phaseAnalysisStringProperty,
          backgroundColorProperty: ResonanceColors.backgroundProperty,
          createKeyboardHelpNode: () => new ResonanceKeyboardHelpContent(),
        },
        options,
      ),
    );
  }
}
