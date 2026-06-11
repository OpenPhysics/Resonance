import { Screen, type ScreenOptions } from "scenerystack/sim";
import { ResonanceKeyboardHelpContent } from "../common/view/ResonanceKeyboardHelpContent.js";
import { ResonanceStrings } from "../i18n/ResonanceStrings.js";
import type { ResonancePreferencesModel } from "../preferences/ResonancePreferencesModel.js";
import ResonanceColors from "../ResonanceColors.js";
import { ChladniModel } from "./model/ChladniModel.js";
import { ChladniScreenView } from "./view/ChladniScreenView.js";

export class ChladniScreen extends Screen<ChladniModel, ChladniScreenView> {
  public constructor(preferencesModel: ResonancePreferencesModel, options: ScreenOptions) {
    super(
      () => new ChladniModel(),
      (model: ChladniModel) => new ChladniScreenView(model, preferencesModel),
      {
        ...options,
        name: ResonanceStrings.screens.chladniPatternsStringProperty,
        backgroundColorProperty: ResonanceColors.backgroundProperty,
        createKeyboardHelpNode: () => new ResonanceKeyboardHelpContent(),
      },
    );
  }
}
