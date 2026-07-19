# Model - Resonance

This document describes the model (the underlying physics, math, and behavior) for the simulation, in
terms appropriate for an educator. It is the companion to
[implementation-notes.md](./implementation-notes.md), which targets developers.

## Overview

Resonance explores **driven, damped harmonic oscillators** and **Chladni plate patterns** across
four screens:

| Screen | Focus |
|---|---|
| **Single Oscillator** | One mass–spring–damper; resonance, damping regimes, presets |
| **Multiple Oscillators** | 1–10 systems with different natural frequencies |
| **Phase Analysis** | Phase lag, phase-space and time-series graphs |
| **Chladni Patterns** | 2D plate modes; grains migrate to nodal lines |

The first three screens share `BaseOscillatorScreenModel` physics; Chladni uses an independent
modal-superposition + particle-walk model.

## Coordinate convention

Model coordinates use **positive x upward** (displacement from equilibrium). The view flips y for
screen drawing via `ModelViewTransform2`. **x = 0** is the equilibrium position (mass at rest
above the driver plate).

## Driven oscillator (screens 1–3)

### Setup

A motor oscillates a **driver plate** vertically. Springs connect the plate to masses above it.
Driving is **displacement-based**: the plate position is y_driver = A·sin(ωt), not a direct force
on the mass.

### Equation of motion

m·a = −k·x − b·v − m·g + k·A·sin(ωt)

Equivalently, with x_plate = A·sin(ωt): m·a = −k·(x − x_plate) − b·v − m·g.

Forces:

- **Spring:** F = −k·x (Hooke's law relative to equilibrium)
- **Damping:** F = −b·v
- **Gravity:** F = −m·g (downward in upward-positive coords; optional Moon g = 1.62 m/s²)
- **Driving:** effective F_drive = k·A·sin(ωt) from the moving plate

**State:** position x, velocity v, plus accumulated driving phase (for smooth frequency changes).

### Key quantities

| Quantity | Formula |
|---|---|
| Natural angular frequency | ω₀ = √(k/m) |
| Natural frequency | f₀ = ω₀/(2π) |
| Damping ratio | ζ = b / (2√(mk)) |
| Quality factor | Q = √(mk) / b |

**Resonance:** response amplitude is largest when f_drive ≈ f₀ (exact peak shifts slightly for
damped systems: f_peak = f₀·√(1 − 2ζ²) when ζ < 1/√2).

**Phase lag φ** (displacement vs driving): ≈ 0 below resonance, π/2 at resonance, ≈ π above.

### Energy

- KE = ½·m·v²
- Spring PE = ½·k·x²
- Gravitational PE = −m·g·x (included in total PE when gravity is on)
- With damping, mechanical energy decays in free oscillation; with driving, steady-state input
  balances dissipation.

The simulation also tracks steady-state amplitudes, RMS values, impedance-related quantities, and
cumulative driver/thermal energy integrals for advanced readouts on the control panels.

### Parameter ranges (controls)

| Parameter | Range | Default (typical) |
|---|---|---|
| Mass | 0.1 – 5.0 kg | 2.53 kg |
| Spring constant | 10 – 1200 N/m | 100 N/m |
| Damping | 0 – 5 N·s/m | 1.0 N·s/m |
| Driving amplitude | 0 – 2 cm (stored in m) | 1 cm |
| Driving frequency | 0 – 6 Hz | 1 Hz |

### Multiple oscillators

When count > 1, natural frequencies are distributed from **1.0 Hz** (oscillator 1) to **5.5 Hz**
(oscillator 10): f_i = 1.0 + (i−1)/(N−1) × 4.5 Hz.

Configuration modes vary how m and k are assigned while sharing one driver (amplitude, frequency,
damping, gravity):

- **Same mass** — k varies → different f₀
- **Same spring constant** — m varies → different f₀
- **Same frequency (mixed)** — m and k scale together → identical f₀, different amplitudes at resonance

### Presets (Single Oscillator)

Six presets in `ResonancePresets` demonstrate damping regimes (values from code):

| Preset | m | k | b | Notes |
|---|---|---|---|---|
| Light and Bouncy | 0.5 kg | 50 N/m | 0.1 | f₀ ≈ 1.59 Hz, drive 1.6 Hz |
| Heavy and Slow | 5.0 kg | 10 N/m | 0.5 | f₀ ≈ 0.23 Hz, drive 0.2 Hz |
| Underdamped | 0.1 kg | 16 N/m | 0.5 | ζ ≈ 0.2, f₀ ≈ 2.0 Hz |
| Critically Damped | 0.1 kg | 16 N/m | 2.5 | ζ ≈ 1.0 |
| Overdamped | 0.1 kg | 16 N/m | 4.0 | ζ ≈ 1.6 |
| Resonance Demo | 1.0 kg | 10 N/m | 0.3 | drive = f₀ ≈ 0.503 Hz |

### Frequency sweep

Automatic sweep from 0 to 6 Hz at **0.067 Hz/s** (~90 s full range), scaled by playback speed.
Sweep enables driving and play; pauses with the sim; stops at max frequency.

## Chladni patterns (screen 4)

### Phenomenon

Fine particles on a vibrating plate migrate to **nodal lines** (zero displacement), revealing
standing-wave patterns at resonant frequencies.

### Model

- Rectangular plate (default 32 cm × 32 cm); material choice sets dispersion.
- Modal superposition: displacement ψ(x, y) from modes (m, n) with
  k_{m,n} = π√((m/a)² + (n/b)²).
- Frequency range **50 – 4000 Hz** (default 500 Hz); sweep rates 33 / 66 / 132 Hz/s.
- **Damping:** γ = 0.02 / √(a·b) (scales with plate size).
- **Particles:** biased random walk — faster motion in high-|ψ| regions pushes grains toward nodes
  (Monte Carlo, not ODE integration).
- **Resonance curve:** precomputed strength vs frequency (progressive background calculation);
  sonification optional.

### Simplifications (Chladni)

- Schematic plate mechanics (not a full elastic plate FEM).
- Particle motion is a visualization algorithm, not granular physics.
- Excitation at a user-placed point; boundary modes clamp or remove escaping grains.

## Simplifications and assumptions (oscillators)

- Linear spring and linear damping; point masses; vertical 1D motion only.
- Massless springs; no collision between mass and driver plate.
- Driving amplitude is plate displacement, so stiffer springs produce stronger effective drive at
  the same A (realistic for base-excited resonance demos).

## References

- French, *Vibrations and Waves* (MIT) — driven damped oscillators, resonance.
- Crawford, *Waves* (Berkeley) — impedance and phase relationships.
- Chladni, *Entdeckungen über die Theorie des Klanges* — original nodal-line demonstrations.
