---
name: FinHost AI
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 60px
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is rooted in the "Quiet Intelligence" philosophy. It moves away from the typical "AI" tropes—glowing particles, dark cosmic backgrounds, and vibrant purples—and instead embraces a human-centric, editorial aesthetic. The goal is to position the product as a reliable, transparent financial partner rather than a "black box" algorithm.

The style is **Minimalist-Modern**. It leverages high-quality typography, generous whitespace to reduce cognitive load, and a strict adherence to a logic-driven layout. The emotional response should be one of clarity, calm, and institutional trust. Visual interest is generated through precise alignment and subtle motion rather than decorative elements.

## Colors

The color palette is intentionally restrained to maintain a premium, professional feel. 

*   **Primary:** A deep Slate (#0F172A) used for text and high-contrast UI elements to provide grounding and authority.
*   **Secondary:** A refined "Soft Blue" (#3B82F6) reserved for primary actions and focused indicators. It is the only "color" in the core interface.
*   **Neutral/Background:** A spectrum of cool grays and off-whites. Backgrounds should primarily use White (#FFFFFF) or the tertiary "Off-White" (#F8FAFC) to create a sense of vast, open space.
*   **Accents:** Success, warning, and error states should use desaturated versions of green, amber, and red to ensure they don't clash with the minimalist aesthetic.

## Typography

This design system utilizes **Inter** exclusively to achieve a systematic and utilitarian feel. The hierarchy is established through significant size differences and tight letter-spacing on larger headings to give them a "custom-tailored" look.

- **Headlines:** Use Semi-Bold weights with negative letter-spacing for a modern, compact appearance.
- **Body:** Standard weights with generous line heights (1.5x minimum) to ensure readability of financial data.
- **Labels:** Medium weights with slight tracking for clear categorization in dashboards and tables.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Dashboards use a 12-column fluid grid for data density, while marketing and content-heavy pages use a fixed-width container (1280px) centered in the viewport.

Spacing follows a strict 4pt grid system. To achieve the "generous whitespace" requested, the default margin between logical sections should be `xl` (40px) or `2xl` (64px). Elements should never feel cramped; when in doubt, increase padding. This "un-crowded" approach signals premium quality and allows the user to focus on critical financial insights.

## Elevation & Depth

To maintain a minimal and human-designed aesthetic, the design system avoids heavy shadows. Depth is communicated via **Tonal Layering** and **Low-Contrast Outlines**.

1.  **Layer 0 (Background):** Pure White (#FFFFFF) or the Tertiary Grey (#F8FAFC).
2.  **Layer 1 (Cards/Containers):** White background with a subtle 1px border (#E2E8F0). 
3.  **Elevation (Active/Hover):** When an element needs to "lift," use an extremely soft, diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.03)`. 

Avoid all inner shadows, glows, or heavy blurs. Surfaces should feel physical—like paper or high-quality matte plastic.

## Shapes

The shape language is **Soft and Precise**. 

A radius of `0.25rem` (4px) is the standard for functional components like input fields and buttons. This provides a sharp, professional look that feels more "designed" and less "default" than fully rounded or pill-shaped corners. Larger containers like cards may use `rounded-lg` (8px) to soften the overall interface without losing the structured, architectural feel.

## Components

- **Buttons:** Primary buttons use the Primary Color (Slate) with white text. No gradients. Secondary buttons use a transparent background with a subtle border. Hover states are indicated by a slight shift in background opacity (e.g., 90% opacity).
- **Input Fields:** Minimalist design with a 1px border. Focus state is indicated by a 1px Blue border and a subtle 2px light-blue outer ring (halo).
- **Cards:** White background, 1px Slate-200 border, no shadow by default. Cards are the primary vehicle for AI insights, using typography alone to highlight key data.
- **Chips:** Small, low-contrast pills (Gray-100 background) used for tagging financial categories.
- **Data Tables:** Borderless rows with subtle dividers. Use high-contrast headers (Slate-900) and muted cell text (Slate-500) for clear information hierarchy.
- **AI "Human-In-The-Loop" Indicators:** Instead of "magic" icons, use a small, clean "AI" label in a simple box to denote machine-generated content, maintaining transparency and a grounded feel.