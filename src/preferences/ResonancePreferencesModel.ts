/**
 * PreferencesModel for the Resonance simulation
 * Manages all user preferences including visual, simulation, and localization settings
 */

import { BooleanProperty, Property } from "scenerystack/axon";
import type { SolverType } from "../common/model/SolverType.js";
import type { RendererType } from "./RendererType.js";
import resonanceQueryParameters from "./resonanceQueryParameters.js";

/** Shape of preferences as stored in localStorage (may be partial) */
export interface StoredPreferences {
  showModalControls?: boolean;
  solverType?: SolverType;
  rendererType?: RendererType;
}

export class ResonancePreferencesModel {
  // Simulation preferences
  public readonly solverTypeProperty: Property<SolverType>;

  // Chladni screen preferences
  public readonly showModalControlsProperty: BooleanProperty;

  // Rendering preferences
  public readonly rendererTypeProperty: Property<RendererType>;

  // Localization preferences (handled by SceneryStack's locale system)
  // We don't need a separate property for this as it's managed by joist

  public constructor() {
    // Initial values come from query parameters (see resonanceQueryParameters).
    this.solverTypeProperty = new Property<SolverType>(resonanceQueryParameters.solverType as SolverType);

    // Chladni screen preferences - modal controls hidden by default
    this.showModalControlsProperty = new BooleanProperty(resonanceQueryParameters.showModalControls);

    // Rendering preferences - default to Canvas
    this.rendererTypeProperty = new Property<RendererType>(resonanceQueryParameters.rendererType as RendererType);

    // Set up persistence
    this.setupPersistence();
  }

  /**
   * Load preferences from localStorage
   */
  private loadPreferences(): void {
    try {
      const saved = localStorage.getItem("resonance-preferences");
      if (saved) {
        const preferences = JSON.parse(saved) as StoredPreferences;

        if (preferences.solverType) {
          this.solverTypeProperty.value = preferences.solverType;
        }
        if (preferences.showModalControls !== undefined) {
          this.showModalControlsProperty.value = preferences.showModalControls;
        }
        if (preferences.rendererType) {
          this.rendererTypeProperty.value = preferences.rendererType;
        }
      }
    } catch {
      // Preferences are best-effort; ignore load errors
    }
  }

  /**
   * Save preferences to localStorage
   */
  private savePreferences(): void {
    try {
      const preferences = {
        solverType: this.solverTypeProperty.value,
        showModalControls: this.showModalControlsProperty.value,
        rendererType: this.rendererTypeProperty.value,
      };
      localStorage.setItem("resonance-preferences", JSON.stringify(preferences));
    } catch {
      // Preferences are best-effort; ignore save errors
    }
  }

  /**
   * Set up automatic persistence - save whenever a preference changes
   */
  private setupPersistence(): void {
    // Load saved preferences
    this.loadPreferences();

    // Save whenever any preference changes
    this.solverTypeProperty.link(() => this.savePreferences());
    this.showModalControlsProperty.link(() => this.savePreferences());
    this.rendererTypeProperty.link(() => this.savePreferences());
  }

  /**
   * Reset all preferences to default values
   */
  public reset(): void {
    this.solverTypeProperty.reset();
    this.showModalControlsProperty.reset();
    this.rendererTypeProperty.reset();
  }
}
