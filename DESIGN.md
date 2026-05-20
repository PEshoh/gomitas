---
name: Clario Design System
description: Premium functional gummies landing page design system.
colors:
  primary: "#7BB684"
  secondary: "#9C82CD"
  tertiary: "#FCAE3B"
  neutral-bg: "#FAF8F5"
  neutral-text: "#0F291E"
  neutral-muted: "#4A5D54"
  dark-bg: "#101614"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.2
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "24px"
  lg: "50px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "14px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "14px 32px"
---

# Design System: Clario

## 1. Overview

**Creative North Star: "The Sensorial Sanctuary"**

The design system for Clario focuses on an organic, clinical-sensorial environment. It is designed to look clean and premium, evoking a sense of calm, focus, and clarity. It merges soft textures (linen background, frosted glass panels) with high-fidelity, high-performance interactions to simulate physical tactility.

We reject flat, sterile corporate-SaaS structures and overstimulated, neon-pulsing energy styles. Layouts feel spacious and breathable, and colors dynamically align with the chosen state of mind.

**Key Characteristics:**
- Tactile glassmorphism with high-contrast borders and deep blurs.
- Interactive mood variant shifting affecting the entire page color theme.
- Organic deceleration in hover states and inertial returns.

## 2. Colors

Colors represent physiological states of focus, calm, and energy. We use a Committed/Full Palette strategy depending on the user's selected state of mind.

### Primary (Focus Sage)
- **Sage Green** (#7BB684): The core color of focus, representing clarity, neural harmony, and nature. Used as the default primary brand indicator.

### Secondary (Calm Lavender)
- **Lavender** (#9C82CD): Represents rest, nervous system calming, and decompression.

### Tertiary (Energy Gold)
- **Mandarina Gold** (#FCAE3B): Represents cellular energy, clean productivity, and brightness.

### Neutral
- **Warm Linen** (#FAF8F5): Background base color. Tinted with warm light chroma.
- **Charcoal Forest** (#101614): Deep dark forest tone for headers, footers, and contrasting blocks.
- **Deep Organic Green** (#0F291E): High-contrast readable body text.

### Named Rules
**The Dynamic Theme Rule.** Only one mood accent color may be primary on a screen at any given time. When switching themes, all theme-related background gradients, border glows, buttons, and highlights must transition smoothly in unison.

## 3. Typography

**Display Font:** Lora (serif)
**Body/Heading Font:** Outfit (sans-serif)
**Body Paragraph Font:** Plus Jakarta Sans (sans-serif)

### Hierarchy
- **Display** (Lora, Italic, clamp(2.5rem, 7vw, 4.5rem), 1.2): Used for hero title emphasis ("mentes ocupadas.").
- **Headline** (Outfit, Bold, clamp(1.8rem, 5vw, 2.8rem), 1.2): Used for section titles.
- **Title** (Outfit, Bold, 1.25rem - 1.8rem, 1.3): Used for cards and secondary headers.
- **Body** (Plus Jakarta Sans, Regular, 1rem, 1.6): Used for tags, descriptions, and lists. Max line length is kept under 70ch.

### Named Rules
**The Serif-Italic Accent Rule.** The serif typeface (Lora Italic) must only be used as a high-contrast accent to highlight emotional keywords or focal descriptors within large sans-serif headings.

## 4. Elevation

The system is layered and tactile, using glass panels floating over organic glowing backdrops to convey depth.

### Shadow Vocabulary
- **shadow-soft** (`0 10px 40px rgba(0, 0, 0, 0.04)`): Baseline shadow for floating cards and glass elements.
- **shadow-medium** (`0 20px 50px rgba(15, 41, 30, 0.08)`): Active hover elevation.

### Named Rules
**The Frosted Glass Rule.** Glass containers must utilize high-blur backdrop-filters (16px) and high-contrast, semi-transparent borders to remain legible against active moving backdrops.

## 5. Components

### Buttons
- **Shape:** pill/oval (50px radius).
- **Primary:** `.btn-primary` (background: `var(--theme-accent)`, text: `#FFFFFF`, padding: `0.9rem 2rem`).
- **Outline:** `.btn-outline` (background: transparent, border: `1.5px solid var(--text-primary)`, text: `var(--text-primary)`).
- **Hover:** Magnetic attraction towards cursor, and background color shifts dynamically according to active theme.

### Cards / Bento Grid
- **Corner Style:** Large rounded corners (24px).
- **Background:** Frosted glass (`rgba(255, 255, 255, 0.65)` with 16px blur) and subtle gradient overlay mapping to the specific product variant.

### Navigation
- **Style:** Floating glass navigation bar anchored to the top of the viewport. Uses a pill indicator (`.nav-indicator-pill`) that glides and stretches horizontally to highlight the active section.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH/HSL tinting for all custom accent colors to match the dynamic state system.
- **Do** keep headings under 3 lines on desktop viewports.
- **Do** ensure interactive buttons have smooth magnetic attraction and return-to-center physics.

### Don't:
- **Don't** use standard un-tinted neutrals (`#000000`, `#ffffff`, `#cccccc`).
- **Don't** use side-stripe borders (e.g. `border-left: 4px solid var(--theme-primary)`) on cards.
- **Don't** use gradient text under any circumstances.
- **Don't** allow buttons to snap back to center instantly when the mouse leaves.
