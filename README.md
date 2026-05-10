# Linwis Portfolio

Personal portfolio built with Next.js, React, Tailwind CSS, GSAP, and a custom WebAssembly software renderer.

The hero section renders Suzanne through `LinwisEngine` in a `<canvas>`. The generated Emscripten files live in the app so the page can load the engine, its `.wasm` binary, and the preload package with model/texture assets.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- GSAP for text interaction
- Emscripten-generated WASM renderer

## Engine Files

The web build expects these generated assets:

```text
src/shared/lib/linwis-engine/linwis_engine.js
src/shared/lib/linwis-engine/linwis_engine.d.ts
public/wasm/linwis_engine.wasm
public/wasm/linwis_engine.data
```

`linwis_engine.data` currently preloads:

```text
/assets/suzane.obj
/assets/test_texture.png
```

After regenerating `linwis_engine.js`, check that Turbopack does not see a literal `new URL('linwis_engine.wasm', import.meta.url)` fallback. The wrapper resolves runtime files through `locateFile`:

```text
/wasm/linwis_engine.wasm
/wasm/linwis_engine.data
```

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful checks:

```bash
npm run lint
npm run build
```

## Notes

- The canvas uses pointer events to pass mouse/touch control to the engine.
- `touch-none` is required on the canvas so drag gestures are sent to the renderer instead of scrolling the page.
- The hydration warning with `cz-shortcut-listen="true"` comes from a browser extension, not the app.
