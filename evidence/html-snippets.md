# Key HTML snippets

## Landmark template with skip link
```html
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" role="banner">…</header>
<nav aria-label="Primary" class="site-nav">…</nav>
<main id="main" tabindex="-1">…</main>
<aside aria-labelledby="aside-title">…</aside>
<footer class="site-footer" role="contentinfo">…</footer>
```

## Example form group with label/for + helper text
```html
<div class="form-group">
  <label for="email">Email <span class="required" aria-hidden="true">*</span></label>
  <div id="email-help" class="help">We’ll only use it to reply.</div>
  <input id="email" name="email" type="email" required aria-describedby="email-help" />
</div>
```

## Example of minimal ARIA where necessary (active nav link)
```html
<nav aria-label="Primary">
  <ul>
    <li><a href="./index.html" aria-current="page">Home</a></li>
    <li><a href="./views/data.html">Data</a></li>
    <li><a href="./views/form.html">Form</a></li>
  </ul>
</nav>
```

## Keyboard-operable component (native disclosure)
```html
<details>
  <summary>Form tips</summary>
  <ul>
    <li>Labels associate with inputs using for/id.</li>
    <li>Helper text connects with aria-describedby.</li>
    <li>Prefer native semantics over ARIA.</li>
  </ul>
</details>
```

## Color contrast notes (tokens → contrast)
- Text on background: `--color-text` (#111827) on `--color-bg` (#ffffff) ≈ 12.6:1 (passes).
- Links/buttons: `--color-primary` (#1e40af) on white ≈ 8.7:1 (passes).
- Inverse text: `--color-primary-contrast` (#ffffff) on primary (#1e40af) ≈ 8.7:1 (passes).
- Focus outline: `--color-focus` (#0b5fff) against white ≈ 5.8:1 (≥ 3:1 required for focus indicators).
- Muted text: `--color-muted` (#4b5563) on white ≈ 5.7:1 (passes).

Please include the exported checker screenshots in the repository under `evidence/`:
- `evidence/contrast-text-on-bg.png`
- `evidence/contrast-primary-on-white.png`
- `evidence/contrast-focus-outline.png`