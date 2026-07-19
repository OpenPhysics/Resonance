/**
 * MultipleOscillatorsScreen is the second screen of the simulation.
 * It demonstrates multiple driven, damped harmonic oscillators with different natural frequencies.
 */

import { type EmptySelfOptions, optionize } from "scenerystack/phet-core";
import { Screen, type ScreenOptions } from "scenerystack/sim";
import { createMultipleOscillatorsIcon } from "../common/ResonanceScreenIcons.js";
import { ResonanceKeyboardHelpContent } from "../common/view/ResonanceKeyboardHelpContent.js";
import { ResonanceStrings } from "../i18n/ResonanceStrings.js";
import type { ResonancePreferencesModel } from "../preferences/ResonancePreferencesModel.js";
import ResonanceColors from "../ResonanceColors.js";
import { MultipleOscillatorsModel } from "./model/MultipleOscillatorsModel.js";
import { MultipleOscillatorsScreenView } from "./view/MultipleOscillatorsScreenView.js";

export class MultipleOscillatorsScreen extends Screen<MultipleOscillatorsModel, MultipleOscillatorsScreenView> {
  public constructor(preferencesModel: ResonancePreferencesModel, options: ScreenOptions) {
    super(
      () => new MultipleOscillatorsModel(preferencesModel),
      (model: MultipleOscillatorsModel) => new MultipleOscillatorsScreenView(model),
      optionize<ScreenOptions, EmptySelfOptions, ScreenOptions>()(
        {
          name: ResonanceStrings.screens.multipleOscillatorsStringProperty,
          backgroundColorProperty: ResonanceColors.backgroundProperty,
          createKeyboardHelpNode: () => new ResonanceKeyboardHelpContent(),
          homeScreenIcon: createMultipleOscillatorsIcon(),
          navigationBarIcon: createMultipleOscillatorsIcon(),
        },
        options,
      ),
    );
  }
}
