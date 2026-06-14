/**
 * resonanceQueryParameters.ts
 *
 * Sim-specific startup query parameters for Resonance. These provide the
 * initial values for the sim-specific preferences in ResonancePreferencesModel.
 * Public-facing parameters set `public: true`.
 *
 * Usage: append e.g. `?solverType=analytical&showModalControls=true` to the URL.
 */

import { logGlobal } from "scenerystack/phet-core";
import { QueryStringMachine } from "scenerystack/query-string-machine";
import { SolverType } from "../common/model/SolverType.js";
import ResonanceNamespace from "../common/ResonanceNamespace.js";
import { RendererType } from "./RendererType.js";

const resonanceQueryParameters = QueryStringMachine.getAll({
  /** ODE solver used by the simulation. */
  solverType: {
    type: "string",
    defaultValue: SolverType.RUNGE_KUTTA_4,
    validValues: Object.values(SolverType),
    public: true,
  },

  /** Whether the per-mode controls are shown on the Chladni screen. */
  showModalControls: {
    type: "boolean",
    defaultValue: false,
    public: true,
  },

  /** Renderer used for the Chladni visualization. */
  rendererType: {
    type: "string",
    defaultValue: RendererType.CANVAS,
    validValues: Object.values(RendererType),
    public: true,
  },
});

ResonanceNamespace.register("resonanceQueryParameters", resonanceQueryParameters);

// Log query parameters (for the console / PhET-iO).
logGlobal("phet.chipper.queryParameters");

export default resonanceQueryParameters;
