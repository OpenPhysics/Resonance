/**
 * ResonanceColors defines the color palette for the Resonance simulation.
 * Colors are defined as ProfileColorProperty instances which adapt to different color profiles.
 */

import { Color, ProfileColorProperty } from "scenerystack/scenery";
import ResonanceNamespace from "./common/ResonanceNamespace.js";

const ResonanceColors = {
  // Background
  backgroundProperty: new ProfileColorProperty(ResonanceNamespace, "background", {
    default: new Color(0, 0, 0),
    projector: new Color(255, 255, 255),
  }),

  // Panel
  panelFillProperty: new ProfileColorProperty(ResonanceNamespace, "panelFill", {
    default: new Color(40, 40, 40),
    projector: new Color(240, 240, 240),
  }),

  panelStrokeProperty: new ProfileColorProperty(ResonanceNamespace, "panelStroke", {
    default: new Color(150, 150, 150),
    projector: new Color(204, 204, 204),
  }),

  // Text
  textProperty: new ProfileColorProperty(ResonanceNamespace, "text", {
    default: new Color(255, 255, 255),
    projector: new Color(0, 0, 0),
  }),

  textSecondaryProperty: new ProfileColorProperty(ResonanceNamespace, "textSecondary", {
    default: new Color(180, 180, 180),
    projector: new Color(102, 102, 102),
  }),

  // Disabled text color (for buttons, etc.)
  textDisabledProperty: new ProfileColorProperty(ResonanceNamespace, "textDisabled", {
    default: new Color(100, 100, 100),
    projector: new Color(150, 150, 150),
  }),

  // Preferences text - stays black regardless of color profile
  preferencesTextProperty: new ProfileColorProperty(ResonanceNamespace, "preferencesText", {
    default: new Color(0, 0, 0),
    projector: new Color(0, 0, 0),
  }),

  preferencesTextSecondaryProperty: new ProfileColorProperty(ResonanceNamespace, "preferencesTextSecondary", {
    default: new Color(102, 102, 102),
    projector: new Color(102, 102, 102),
  }),

  // Spring and mass
  springProperty: new ProfileColorProperty(ResonanceNamespace, "spring", {
    default: new Color(255, 100, 100),
    projector: new Color(204, 0, 0),
  }),

  massProperty: new ProfileColorProperty(ResonanceNamespace, "mass", {
    default: new Color(120, 180, 255),
    projector: new Color(51, 102, 255),
  }),

  massStrokeProperty: new ProfileColorProperty(ResonanceNamespace, "massStroke", {
    default: new Color(180, 220, 255),
    projector: new Color(0, 51, 170),
  }),

  massLabelProperty: new ProfileColorProperty(ResonanceNamespace, "massLabel", {
    default: new Color(255, 255, 255),
    projector: new Color(255, 255, 255),
  }),

  // Mass label color when being dragged (yellow for visibility)
  massLabelDraggingProperty: new ProfileColorProperty(ResonanceNamespace, "massLabelDragging", {
    default: new Color(255, 255, 100),
    projector: new Color(255, 255, 0), // Bright yellow
  }),

  equilibriumProperty: new ProfileColorProperty(ResonanceNamespace, "equilibrium", {
    default: new Color(140, 140, 140), // subtle dark gray
    projector: new Color(100, 100, 100), // darker gray for light background
  }),

  // Driver box
  driverFillProperty: new ProfileColorProperty(ResonanceNamespace, "driverFill", {
    default: new Color(80, 80, 80),
    projector: new Color(136, 136, 136),
  }),

  driverStrokeProperty: new ProfileColorProperty(ResonanceNamespace, "driverStroke", {
    default: new Color(180, 180, 180),
    projector: new Color(68, 68, 68),
  }),

  driverTextProperty: new ProfileColorProperty(ResonanceNamespace, "driverText", {
    default: new Color(255, 255, 255),
    projector: new Color(255, 255, 255),
  }),

  // Control panel
  controlPanelFillProperty: new ProfileColorProperty(ResonanceNamespace, "controlPanelFill", {
    default: new Color(30, 80, 30),
    projector: new Color(204, 255, 204),
  }),

  controlPanelStrokeProperty: new ProfileColorProperty(ResonanceNamespace, "controlPanelStroke", {
    default: new Color(100, 255, 100),
    projector: new Color(0, 102, 0),
  }),

  // Sub-panel colors (for mass/spring/resonator/frequency sub-panel)
  subPanelFillProperty: new ProfileColorProperty(ResonanceNamespace, "subPanelFill", {
    default: new Color(30, 60, 100), // Dark blue for default
    projector: new Color(200, 230, 255), // Light blue
  }),

  subPanelStrokeProperty: new ProfileColorProperty(ResonanceNamespace, "subPanelStroke", {
    default: new Color(80, 130, 200), // Lighter blue for default
    projector: new Color(100, 150, 200), // Medium blue
  }),

  // Energy colors
  kineticEnergyProperty: new ProfileColorProperty(ResonanceNamespace, "kineticEnergy", {
    default: new Color(255, 180, 50),
    projector: new Color(255, 152, 0),
  }),

  potentialEnergyProperty: new ProfileColorProperty(ResonanceNamespace, "potentialEnergy", {
    default: new Color(100, 200, 255),
    projector: new Color(3, 169, 244),
  }),

  totalEnergyProperty: new ProfileColorProperty(ResonanceNamespace, "totalEnergy", {
    default: new Color(200, 100, 255),
    projector: new Color(156, 39, 176),
  }),

  // Plots
  plot1Property: new ProfileColorProperty(ResonanceNamespace, "plot1", {
    default: new Color(100, 180, 255),
    projector: new Color(33, 150, 243),
  }),

  plot2Property: new ProfileColorProperty(ResonanceNamespace, "plot2", {
    default: new Color(255, 120, 80),
    projector: new Color(255, 87, 34),
  }),

  plot3Property: new ProfileColorProperty(ResonanceNamespace, "plot3", {
    default: new Color(200, 100, 255),
    projector: new Color(156, 39, 176),
  }),

  // Trace line
  traceLineProperty: new ProfileColorProperty(ResonanceNamespace, "traceLine", {
    default: new Color(255, 220, 50), // Bright yellow for dark background
    projector: new Color(200, 0, 0), // Red for projector mode
  }),

  // Graph background (dark by default)
  graphBackgroundProperty: new ProfileColorProperty(ResonanceNamespace, "graphBackground", {
    default: new Color(30, 30, 30),
    projector: new Color(245, 245, 245),
  }),

  // Grid and axes
  gridLinesProperty: new ProfileColorProperty(ResonanceNamespace, "gridLines", {
    default: new Color(100, 100, 100),
    projector: new Color(160, 160, 160),
  }),

  gridIconProperty: new ProfileColorProperty(ResonanceNamespace, "gridIcon", {
    default: new Color(170, 170, 170), // lighter for dark background
    projector: new Color(80, 80, 80), // darker for light background
  }),

  axesProperty: new ProfileColorProperty(ResonanceNamespace, "axes", {
    default: new Color(200, 200, 200),
    projector: new Color(117, 117, 117),
  }),

  // Phase colors
  inPhaseProperty: new ProfileColorProperty(ResonanceNamespace, "inPhase", {
    default: new Color(100, 255, 100),
    projector: new Color(76, 175, 80),
  }),

  outOfPhaseProperty: new ProfileColorProperty(ResonanceNamespace, "outOfPhase", {
    default: new Color(255, 100, 100),
    projector: new Color(244, 67, 54),
  }),

  // Frequency slider track
  frequencyTrackProperty: new ProfileColorProperty(ResonanceNamespace, "frequencyTrack", {
    default: new Color(0, 255, 0),
    projector: new Color(0, 204, 0),
  }),

  // Amplitude slider track
  amplitudeTrackProperty: new ProfileColorProperty(ResonanceNamespace, "amplitudeTrack", {
    default: new Color(100, 180, 255),
    projector: new Color(51, 153, 255),
  }),

  // Toggle switch colors
  toggleTrackOffProperty: new ProfileColorProperty(ResonanceNamespace, "toggleTrackOff", {
    default: new Color(100, 100, 100),
    projector: new Color(102, 102, 102), // #666666
  }),

  toggleTrackOnProperty: new ProfileColorProperty(ResonanceNamespace, "toggleTrackOn", {
    default: new Color(100, 255, 100),
    projector: new Color(0, 204, 0), // #00CC00
  }),

  // Spring back color (for ParametricSpringNode)
  springBackProperty: new ProfileColorProperty(ResonanceNamespace, "springBack", {
    default: new Color(180, 50, 50),
    projector: new Color(102, 0, 0), // #660000
  }),

  // Spring color for high spring constant (purple, used above threshold)
  // This creates a visual transition: red (soft) -> purple (stiff)
  springStiffProperty: new ProfileColorProperty(ResonanceNamespace, "springStiff", {
    default: new Color(160, 80, 220), // purple
    projector: new Color(128, 0, 200),
  }),

  // Spring back color for high spring constant
  springStiffBackProperty: new ProfileColorProperty(ResonanceNamespace, "springStiffBack", {
    default: new Color(100, 40, 140), // darker purple
    projector: new Color(80, 0, 128),
  }),

  // Gravity toggle colors
  gravityToggleOffProperty: new ProfileColorProperty(ResonanceNamespace, "gravityToggleOff", {
    default: new Color(100, 100, 100),
    projector: new Color(153, 153, 153), // #999999
  }),

  gravityToggleOnProperty: new ProfileColorProperty(ResonanceNamespace, "gravityToggleOn", {
    default: new Color(100, 180, 255),
    projector: new Color(68, 153, 255), // #4499FF
  }),

  // Chladni plate visualization
  chladniParticleProperty: new ProfileColorProperty(ResonanceNamespace, "chladniParticle", {
    default: new Color(255, 255, 255), // White particles on dark background
    projector: new Color(40, 40, 40), // Dark particles on light background
  }),

  chladniBackgroundProperty: new ProfileColorProperty(ResonanceNamespace, "chladniBackground", {
    default: new Color(26, 26, 46), // Dark blue-ish background
    projector: new Color(240, 240, 245), // Light background for projector
  }),

  chladniPlateBorderProperty: new ProfileColorProperty(ResonanceNamespace, "chladniPlateBorder", {
    default: new Color(68, 68, 102),
    projector: new Color(100, 100, 120),
  }),

  // Vector arrow colors (for velocity, acceleration, force visualization)
  velocityVectorProperty: new ProfileColorProperty(ResonanceNamespace, "velocityVector", {
    default: new Color(0, 255, 0), // Bright green
    projector: new Color(0, 180, 0),
  }),

  accelerationVectorProperty: new ProfileColorProperty(ResonanceNamespace, "accelerationVector", {
    default: new Color(255, 255, 0), // Yellow
    projector: new Color(200, 180, 0),
  }),

  appliedForceVectorProperty: new ProfileColorProperty(ResonanceNamespace, "appliedForceVector", {
    default: new Color(255, 165, 0), // Orange
    projector: new Color(255, 140, 0),
  }),

  // Button disabled color
  buttonDisabledProperty: new ProfileColorProperty(ResonanceNamespace, "buttonDisabled", {
    default: new Color(90, 90, 90),
    projector: new Color(180, 180, 180),
  }),

  // Toggle switch thumb color
  toggleThumbProperty: new ProfileColorProperty(ResonanceNamespace, "toggleThumb", {
    default: new Color(255, 255, 255),
    projector: new Color(255, 255, 255),
  }),

  // Icon stroke color (power symbol, sweep icon)
  iconStrokeProperty: new ProfileColorProperty(ResonanceNamespace, "iconStroke", {
    default: new Color(102, 102, 102), // #666
    projector: new Color(80, 80, 80),
  }),

  // Connection rod marker stroke
  connectionRodMarkerProperty: new ProfileColorProperty(ResonanceNamespace, "connectionRodMarker", {
    default: new Color(51, 51, 51), // #333
    projector: new Color(100, 100, 100),
  }),

  // Displacement colormap colors (blue-white-red gradient)
  colormapNegativeProperty: new ProfileColorProperty(ResonanceNamespace, "colormapNegative", {
    default: new Color(0, 100, 255), // Blue for negative displacement
    projector: new Color(0, 80, 200),
  }),

  colormapZeroProperty: new ProfileColorProperty(ResonanceNamespace, "colormapZero", {
    default: new Color(255, 255, 255), // White for zero (nodal lines)
    projector: new Color(240, 240, 240),
  }),

  colormapPositiveProperty: new ProfileColorProperty(ResonanceNamespace, "colormapPositive", {
    default: new Color(255, 80, 80), // Red for positive displacement
    projector: new Color(220, 50, 50),
  }),
};

export default ResonanceColors;
