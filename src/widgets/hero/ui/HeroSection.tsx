"use client";

import { DynamicLinwisHeroCanvas } from "./DynamicLinwisCanvas";
import { HeroGridCanvas } from "./HeroGridCanvas";

export function HeroSection() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-background" id="hero">
      
      {/* 3D Raymarched Grid Layer */}
      <HeroGridCanvas />

      <main className="relative z-10 grid min-h-svh w-full grid-cols-1 items-center gap-6 lg:gap-10 px-6 pb-10 pt-20 lg:pt-24 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.78fr)] lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-5 geistMono text-xs uppercase text-text/50 ">
            Software rasterizer / frontend systems
          </p>

          <h1 className="max-w-4xl -translate-x-1 lg:-translate-x-2 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] text-text">
            Interfaces with a renderer inside.
          </h1>

          {/* MOBILE CANVAS: Displayed only on mobile, between text, much smaller */}
          <div className="relative my-8 flex h-[35svh] max-h-75 w-full max-w-sm flex-col items-center justify-center lg:hidden z-20">
            <div className="h-full w-full border border-text/10 bg-background-2/40 p-2">
              <DynamicLinwisHeroCanvas />
            </div>
            <div className="w-full mt-2 flex justify-end">
              <p className="geistMono text-[8px] uppercase text-text/30 text-right leading-tight">
                * 0.5x internal resolution
              </p>
            </div>
          </div>

          <p className="mt-2 lg:mt-8 max-w-xl text-lg leading-8 text-text/68 relative z-20">
            I build product UIs with the same care I put into graphics code:
            clean systems, sharp motion, and enough low-level curiosity to make
            a portfolio hero run on my own engine.
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-text/10 py-4 geistMono text-xs uppercase text-text/45">
            <span>Next.js</span>
            <span>WASM</span>
            <span>CPU raster</span>
          </div>
        </div>

        <div className="relative mx-auto hidden lg:flex h-[min(58vh,520px)] w-full max-w-165 flex-col items-center justify-center lg:mx-0 z-20">
          <div className="absolute -left-6 top-8 hidden h-px w-24 bg-text/20 lg:block" />
          <div className="absolute -right-4 bottom-10 hidden h-24 w-px bg-text/20 lg:block" />

          <div className="h-full w-full border border-text/10 bg-background-2/40 p-2">
            <DynamicLinwisHeroCanvas />
          </div>
          
          <div className="w-full mt-3 flex justify-end">
            <p className="geistMono text-[10px] uppercase text-text/30">
              * running at 0.5x internal resolution to preserve 60fps page scroll
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
