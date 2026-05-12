# Linwis Portfolio

<img width="1898" height="862" alt="image" src="https://github.com/user-attachments/assets/1f50c70f-b91b-4df9-acb1-1828b784cdd1" />

Personal frontend portfolio built with Next.js, React, Tailwind CSS, GSAP, Lenis, and a custom WebAssembly software renderer.

The site is designed as a full-screen scroll experience: stacked panels introduce the hero, about, skills, projects, and contact sections. The hero renders Suzanne through `LinwisEngine` inside a `<canvas>`, while the projects section uses horizontal GSAP choreography with responsive cards and modal details.

## Live

https://linwis-portfolio.vercel.app/

## Highlights

- Custom WASM renderer in the hero, generated from `LinwisEngine`.
- Sticky full-screen panel flow with GSAP ScrollTrigger.
- Smooth scroll behavior with Lenis.
- Responsive project carousel with image previews and detail modals.
- Resume downloads from `public`.
- Portfolio content split into widget-level data and UI modules.

## Featured Projects

- `LinwisEngine` - C++17 software rasterizer rendered through Win32 and ported into the portfolio hero via WebAssembly.
- `LinwisAd Playable` - mobile 3D merge tower-defense playable built with raw Three.js and custom Web Audio.
- `Linwis Portfolio` - this Next.js 16 portfolio with GSAP motion, WASM rendering, responsive cards, and downloadable resume assets.
- `TurbinoCoffee` - scroll-driven coffee landing page with React Three Fiber and GSAP.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP and `@gsap/react`
- Lenis
- OGL
- Geist fonts
- Emscripten-generated WebAssembly renderer

## Project Structure

```text
src/app/                         App Router entrypoints
src/assets/                      Global styles, favicon, logo
src/shared/lib/                  Shared runtime helpers and engine loader
src/shared/ui/                   Reusable UI primitives
src/widgets/hero/                Hero canvas and intro section
src/widgets/about/               About section
src/widgets/Skills/              Skills data and UI
src/widgets/Projects/            Project data, cards, carousel, and modal
src/widgets/Contact/             Contact and resume links
public/                          Static images, resume files, and WASM assets
```

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

- The hero canvas uses pointer events to pass mouse and touch control to the engine.
- `touch-none` is required on the canvas so drag gestures are sent to the renderer instead of scrolling the page.
- Project images live in `public` and are referenced by root-relative paths like `/LinwisEngine.png`.
- Resume files are served from `public/Frontend_Developer_Resume_Linwis.pdf` and `public/Frontend_Developer_Resume_Linwis.docx`.
- A hydration warning containing `cz-shortcut-listen="true"` usually comes from a browser extension, not the app.
