/**
 * MultipleOscillatorsScreenView is the view for the Multiple Oscillators screen.
 * It extends BaseOscillatorScreenView and hides the trace functionality
 * (trace is not useful with multiple resonators).
 */

import { BaseOscillatorScreenView } from "../../common/view/BaseOscillatorScreenView.js";
import type { OscillatorControlPanelOptions } from "../../common/view/OscillatorControlPanel.js";

export class MultipleOscillatorsScreenView extends BaseOscillatorScreenView {
  protected override getControlPanelOptions(): Partial<OscillatorControlPanelOptions> {
    return { showTrace: false };
  }
}
