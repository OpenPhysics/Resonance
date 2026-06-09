/**
 * SingleOscillatorScreen is the first screen of the simulation.
 * It demonstrates a single driven, damped harmonic oscillator.
 */

import { Screen, type ScreenOptions } from "scenerystack/sim";
import ResonanceColors from "../common/ResonanceColors.js";
import { KeyboardShortcutsNode } from "../common/view/KeyboardShortcutsNode.js";
import { ResonanceStrings } from "../i18n/ResonanceStrings.js";
import type { ResonancePreferencesModel } from "../preferences/ResonancePreferencesModel.js";
import { SingleOscillatorModel } from "./model/SingleOscillatorModel.js";
import { SingleOscillatorScreenView } from "./view/SingleOscillatorScreenView.js";

export class SingleOscillatorScreen extends Screen<SingleOscillatorModel, SingleOscillatorScreenView> {
  public constructor(preferencesModel: ResonancePreferencesModel, options: ScreenOptions) {
    super(
      () => new SingleOscillatorModel(preferencesModel),
      (model: SingleOscillatorModel) => new SingleOscillatorScreenView(model),
      {
        ...options,
        name: ResonanceStrings.screens.singleOscillatorStringProperty,
        backgroundColorProperty: ResonanceColors.backgroundProperty,
        createKeyboardHelpNode: () => new KeyboardShortcutsNode(),
      },
    );
  }
}
