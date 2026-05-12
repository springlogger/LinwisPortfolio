import type { Project } from "./types";

export const DUMMY_PROJECTS: Project[] = [
  {
    title: "LinwisEngine",
    desc: "A custom 3D game engine written in C++17. Rendering is entirely CPU-bound using a custom software rasterizer, outputting directly to a Win32 GDI window.",
    tech: ["C++17", "Software Rasterizer", "3D Math", "Win32"],
    github: "https://github.com/springlogger/LinwisEngine",
    image: "/LinwisEngine.png",
    details: [
      "Implemented the graphics pipeline from scratch: model/world/view/clip transforms, six-plane frustum clipping, perspective division, triangle rasterization with edge functions and barycentric coordinates, Bresenham lines, and a Z-buffer.",
      "Built custom math primitives, a scene graph, camera/mesh/object types, .obj loading, PNG textures through stb_image, and UV mapping.",
      "Split the codebase into math, scene, graphics, platform, and core layers so renderer-dependent code stays isolated."
    ]
  },
  {
    title: "LinwisAd Playable",
    desc: "A fully playable 3D merge tower-defense game built with raw Three.js and packed into a lightweight single-file ad experience with custom Web Audio.",
    tech: ["Three.js", "Vite", "Web Audio", "Mobile UI"],
    image: "/LinwisAd.jpg",
    details: [
      "Implemented 3D merge gameplay on a 3x3 board with drag-and-drop, raycasting, tower upgrades, projectile spawning, target selection, and collision handling.",
      "Built a custom audio layer on top of the Web Audio API to avoid mobile browser limitations around programmatic volume control.",
      "Added asset preloading and a loading screen so the game only starts after models, textures, audio, and UI state are ready.",
      "Tuned the camera, safe-area handling, input flow, and layout scaling for portrait mobile devices and unusual aspect ratios."
    ]
  },
  {
    title: "Linwis Portfolio",
    desc: "This portfolio site: a Next.js 16 app with sticky full-screen panels, GSAP scroll choreography, Lenis smoothing, and a custom WebAssembly renderer in the hero.",
    tech: ["Next.js 16", "React 19", "Tailwind CSS 4", "GSAP", "WASM"],
    github: "https://github.com/springlogger/LinwisPortfolio",
    image: "/LinwisPortfolio.jpg",
    details: [
      "Built the page as a panel-stacked portfolio with a full-screen hero, about, skills, projects, and contact flow.",
      "Integrated an Emscripten/WebAssembly build of LinwisEngine, loading the renderer, .wasm binary, and preloaded model/texture package from the app.",
      "Organized the UI around widgets and shared modules, with responsive project cards, modal details, smooth scroll behavior, and production build checks."
    ]
  },
  {
    title: "TurbinoCoffee",
    desc: "A scroll-driven landing page for coffee culture. Features a dynamic 3D scene built with React Three Fiber and synchronized with user scroll progress using GSAP.",
    tech: ["Next.js 16", "React 19", "Three.js (R3F)", "GSAP"],
    github: "https://github.com/springlogger/TurbinoCoffee",
    image: "",
    details: [
      "Built a scroll-driven 3D scene where a GLTF coffee cup moves along a path and rotates with GSAP ScrollTrigger progress.",
      "Structured the app with Feature-Sliced Design and boundary checks, keeping pages, widgets, and shared utilities separated."
    ]
  }
];
