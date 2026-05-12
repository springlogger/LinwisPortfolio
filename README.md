# Linwis Portfolio

<img width="1898" height="862" alt="image" src="https://github.com/user-attachments/assets/1f50c70f-b91b-4df9-acb1-1828b784cdd1" />

Personal frontend portfolio built with Next.js, React, Tailwind CSS, GSAP, Lenis, and a custom WebAssembly software renderer.

The site is a full-screen portfolio flow with stacked sticky panels for hero, about, skills, projects, and contact. The hero renders Suzanne through `LinwisEngine` inside a `<canvas>`. The projects section uses a desktop GSAP horizontal scroll scene and a native horizontal carousel on mobile.

## Live

https://linwis-portfolio.vercel.app/

## Highlights

- Custom WASM renderer in the hero, generated from `LinwisEngine`.
- Sticky panel transitions with GSAP ScrollTrigger.
- Smooth page scrolling with Lenis.
- Direction-aware header: it hides while scrolling down and returns only when scrolling up.
- Full-screen animated menu overlay with section links, social links, and resume downloads.
- Responsive project cards with `Details`, `Source`, and `Try` actions.
- Project details modal rendered through a portal with background scroll/input locking.
- Mobile viewport handling with `dvh` and iPhone Safari resize safeguards.
- Widget-level architecture for sections, project data, header state, and overlay UI.

## Featured Projects

- `LinwisEngine` - C++17 software rasterizer rendered through Win32 and ported into the portfolio hero via WebAssembly.
- `LinwisAd Playable` - mobile 3D merge tower-defense playable built with raw Three.js and custom Web Audio.
  - Source: https://github.com/springlogger/LinwisMerge-PlayableAd-
  - Try: https://linwis-merge-playable-ad.vercel.app/
- `Linwis Portfolio` - this Next.js 16 portfolio with GSAP motion, WASM rendering, responsive cards, modals, menu overlay, and downloadable resume assets.
- `TurbinoCoffee` - scroll-driven coffee landing page with React Three Fiber and GSAP.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP, ScrollTrigger, SplitText, and `@gsap/react`
- Lenis
- OGL
- Geist fonts
- Emscripten-generated WebAssembly renderer

## Project Structure

```text
src/app/                         App Router entrypoints
src/assets/                      Global styles, favicon, logo
src/shared/lib/                  Shared runtime helpers, GSAP setup, Lenis, engine loader
src/shared/ui/                   Reusable UI primitives
src/widgets/header/              Header, menu overlay, navigation model, header/menu hooks
src/widgets/hero/                Hero canvas and intro section
src/widgets/about/               About section
src/widgets/Skills/              Skills data and UI
src/widgets/Projects/            Project data, cards, carousel, modal
src/widgets/Contact/             Contact and resume links
public/                          Static images, resume files, and WASM assets
```

## Scroll And Mobile Notes

- Main sections use `dvh` instead of `svh` so iPhone Safari does not leave a blank strip when the browser chrome collapses.
- Global section snap was removed from the main page flow because it fought with mobile Safari, sticky panels, and native touch scrolling.
- Project snap remains inside `ProjectsSection`: desktop uses GSAP snap for the horizontal scroll scene, mobile uses native `snap-x`.
- ScrollTrigger refreshes are guarded on touch devices so Safari address-bar height changes do not make the page jump.
- The header does not appear when scrolling stops; it appears only after an upward scroll gesture.

## Modals And Menu

- The project modal is rendered into `document.body` with `createPortal`.
- When a project modal is open, `body`, `html`, and the site shell are locked so the background cannot scroll or receive pointer/touch input.
- The full-screen menu overlay uses the same background-locking approach and animates both open and close states.
- Menu navigation and external links live in `src/widgets/header/model/navigation.ts`.

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
- Project deploy links are optional. If a project has no deploy URL, the `Try` button is rendered disabled.
- Resume files are served from `public/Frontend_Developer_Resume_Linwis.pdf` and `public/Frontend_Developer_Resume_Linwis.docx`.
- A hydration warning containing `cz-shortcut-listen="true"` usually comes from a browser extension, not the app.
