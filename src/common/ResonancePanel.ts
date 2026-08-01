/**
 * ResonancePanel.ts
 *
 * A pre-themed Panel that automatically uses ResonanceColors for background and
 * border. Use this for all control panels and info boxes in the sim so that
 * default / projector mode switching is handled automatically.
 *
 * ── Basic usage ───────────────────────────────────────────────────────────────
 *
 *   import { ResonancePanel } from "../../common/ResonancePanel.js";
 *   import { VBox, Text } from "scenerystack/scenery";
 *
 *   const content = new VBox({
 *     children: [ new Text("label"), slider ],
 *     spacing: 8,
 *   });
 *   const panel = new ResonancePanel(content);
 *
 * ── Overriding defaults ───────────────────────────────────────────────────────
 *
 *   // Wider margins, sharper corners, custom stroke
 *   const panel = new ResonancePanel(content, { xMargin: 20, cornerRadius: 0 });
 *
 *   // Transparent background (decorative border only)
 *   const panel = new ResonancePanel(content, { fill: "transparent" });
 */

import { type EmptySelfOptions, optionize } from "scenerystack/phet-core";
import type { Node } from "scenerystack/scenery";
import { Panel, type PanelOptions } from "scenerystack/sun";
import ResonanceColors from "../ResonanceColors.js";
import { PANEL_CORNER_RADIUS } from "../ResonanceConstants.js";

export type ResonancePanelOptions = PanelOptions;

export class ResonancePanel extends Panel {
  public constructor(content: Node, providedOptions?: ResonancePanelOptions) {
    const options = optionize<ResonancePanelOptions, EmptySelfOptions, PanelOptions>()(
      {
        fill: ResonanceColors.panelBackgroundColorProperty,
        stroke: ResonanceColors.panelBorderColorProperty,
        cornerRadius: PANEL_CORNER_RADIUS,
        xMargin: 12,
        yMargin: 10,
      },
      providedOptions,
    );
    super(content, options);
  }
}
