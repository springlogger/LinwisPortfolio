import Image from "next/image";
import Logo from "@/src/assets/LinwisLogo.svg";
import { SplitTubeText } from "@/src/shared/ui/SplitTubeText";
import { DynamicLinwisHeroCanvas } from "./DynamicLinwisCanvas";

export function HeroSection() {
  return (
    <section className="hero-stage relative min-h-screen w-full overflow-hidden" id="hero">
      <header className="relative z-20 flex h-20 items-center justify-between px-6 py-3 sm:px-10 lg:px-16">
        <Image className="h-12 w-12" src={Logo} alt="Linwis logo" priority />

        <nav className="hidden md:block">
          <ul className="flex flex-row items-center gap-x-10 geistMono text-sm uppercase text-text/70">
            <li className="cursor-pointer transition-colors hover:text-text">
              <SplitTubeText text="Portfolio" />
            </li>
            <li className="cursor-pointer transition-colors hover:text-text">
              <SplitTubeText text="About" />
            </li>
            <li className="cursor-pointer transition-colors hover:text-text">
              <SplitTubeText text="Projects" />
            </li>
          </ul>
        </nav>

        <p className="geistMono cursor-pointer text-sm uppercase text-text/80 transition-colors hover:text-text">
          Let&apos;s talk
        </p>
      </header>

      <main className="relative z-10 grid min-h-[calc(100dvh-5rem)] w-full grid-cols-1 items-center gap-10 px-6 pb-10 pt-4 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.78fr)] lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-5 geistMono text-xs uppercase text-text/50">
            Software rasterizer / frontend systems
          </p>

          <h1 className="max-w-4xl text-6xl leading-[0.9] text-text sm:text-7xl lg:text-8xl">
            Interfaces with a renderer inside.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-text/68">
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

        <div className="relative mx-auto flex h-[min(58vh,520px)] w-full max-w-[660px] items-center justify-center lg:mx-0">
          <div className="absolute -left-6 top-8 hidden h-px w-24 bg-text/20 lg:block" />
          <div className="absolute -right-4 bottom-10 hidden h-24 w-px bg-text/20 lg:block" />

          <div className="h-full w-full border border-text/10 bg-background-2/40 p-2">
            <DynamicLinwisHeroCanvas />
          </div>
        </div>
      </main>
    </section>
  );
}
