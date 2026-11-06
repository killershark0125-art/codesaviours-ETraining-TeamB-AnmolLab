# Anmol Lab — Brand Colors

> These HEX values are **samples taken from coordinator-provided JPEG images**, not an official brand standards document. JPEG compression and screenshot rendering can shift color values. Use as the working palette until the client confirms the exact HEX codes.

## Working palette

| Role | HEX | Sample source / usage |
|---|---|---|
| Primary | `#22285C` | Main navy banner and logo on the supplied report |
| Secondary | `#7D7E80` | Gray strokes/details in the microscope logo |
| Dark | `#22285C` | Dark headings/footer; same sampled navy |
| Light | `#EDF4FA` | Pale blue report-header background |
| Text | `#22285C` | Suggested dark text color sampled from the brand navy; check contrast for body text |
| White | `#FFFFFF` | White report background and white logo variant |

## Additional colors visible in the comparison image

| HEX | Description | Guidance |
|---|---|---|
| `#303866` | Alternate navy used in one microscope-icon treatment | Confirm which logo treatment is approved before adopting it |
| `#C9CEE4` | Lavender panel background behind the logo comparison | Treat as a comparison-sheet background, not a confirmed brand color |

## CSS variables

```css
:root {
  --color-primary: #22285C;
  --color-secondary: #7D7E80;
  --color-dark: #22285C;
  --color-light: #EDF4FA;
  --color-text: #22285C;
  --color-white: #FFFFFF;
}
```

## Implementation notes

- Keep `#22285C` as the provisional primary brand color.
- Use `#EDF4FA` for soft backgrounds and section surfaces.
- Use white space and restrained gray accents; do not introduce unrelated accent colors.
- Check text/background contrast before release. The sampled values are not a substitute for accessibility testing.
- Ask the client to confirm the exact primary/secondary HEX values and which icon/logo variant is approved.

See [`palette-swatches.png`](palette-swatches.png) for a visual reference.
