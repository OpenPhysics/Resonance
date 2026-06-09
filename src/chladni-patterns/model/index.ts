/**
 * Chladni Model Module Exports
 *
 * This file exports all model-related classes and types for the Chladni plate simulation.
 */

export type { FrequencySweepControllerOptions } from "../../common/model/FrequencySweepController.js";
// Frequency sweep control (re-exported from common)
export { FrequencySweepController } from "../../common/model/FrequencySweepController.js";
export * from "./ChladniConstants.js";
// Constants
export { default as ChladniConstants } from "./ChladniConstants.js";
export type { BoundaryMode, GrainCountOption } from "./ChladniModel.js";
// Main model
export { ChladniModel, GRAIN_COUNT_OPTIONS } from "./ChladniModel.js";
export type { MaterialType } from "./Material.js";
// Material definitions
export { Material } from "./Material.js";
export type { ModalCalculatorOptions } from "./ModalCalculator.js";
// Physics calculations
export { ModalCalculator } from "./ModalCalculator.js";
// Particle management
export { ParticleManager } from "./ParticleManager.js";
export type { PlateGeometryOptions } from "./PlateGeometry.js";
// Plate geometry
export { PlateGeometry } from "./PlateGeometry.js";
// Playback state management
export { PlaybackState, PlaybackStateMachine } from "./PlaybackStateMachine.js";
export type { ResonanceCurveCalculatorOptions } from "./ResonanceCurveCalculator.js";
// Resonance curve calculation
export { ResonanceCurveCalculator } from "./ResonanceCurveCalculator.js";
