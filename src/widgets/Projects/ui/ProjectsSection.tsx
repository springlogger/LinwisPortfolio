"use client";

import { useGSAP } from '@gsap/react';
import { gsap } from '@/src/shared/lib/gsap';
import React, { useRef } from 'react';

const DUMMY_PROJECTS = [
  {
    title: "Project Alpha",
    desc: "A high-performance WASM renderer built from scratch. Demonstrates deep understanding of memory management and CPU-bound graphics pipelines.",
    tech: ["C++", "WASM", "WebGL"],
  },
  {
    title: "Project Beta",
    desc: "A custom 3D math library tailored for interactive web experiences. Avoids bloated dependencies by implementing precise linear algebra primitives.",
    tech: ["TypeScript", "Math", "Performance"],
  },
  {
    title: "Project Gamma",
    desc: "An innovative frontend architecture that bridges low-level rendering context with standard DOM elements, creating a seamless unified UI.",
    tech: ["React", "Custom Renderer", "UI"],
  },
  {
    title: "Project Delta",
    desc: "A collection of complex fragment shaders that run at 60fps even on mobile devices. Focuses on procedural generation and raymarching.",
    tech: ["GLSL", "Shaders", "Mobile"],
  },
  {
    title: "Project Epsilon",
    desc: "A complete software rasterizer demonstrating the inner workings of a GPU pipeline entirely within the browser.",
    tech: ["Algorithms", "Rasterization", "Web Workers"],
  }
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(containerRef.current, {
      xPercent: -100 * ((DUMMY_PROJECTS.length - 1) / DUMMY_PROJECTS.length),
      ease: "none",
      scrollTrigger: {
        trigger: "#projects-panel",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // smooth movement during scroll
        snap: {
          snapTo: 1 / (DUMMY_PROJECTS.length - 1),
          duration: { min: 0.1, max: 0.3 },
          delay: 0, // trigger immediately when scroll stops
          ease: "power2.out", // 'out' is slightly faster to start than 'inOut'
        }
      }
    });
  }, []);

  return (
    <section className='h-dvh w-full relative flex flex-col justify-center overflow-hidden'>
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-[0.2em] md:tracking-[0.5em] text-text/10">SELECTED WORK</h2>
      </div>

      <div 
        ref={containerRef}
        className="flex h-full will-change-transform"
        style={{ width: `${DUMMY_PROJECTS.length * 100}vw` }}
      >
        {DUMMY_PROJECTS.map((project, index) => (
          <div key={index} className="h-full w-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 relative">
            
            <div className="w-full max-w-6xl h-full max-h-[85dvh] lg:max-h-[70dvh] bg-background-2/60 backdrop-blur-md border border-text/10 rounded-3xl flex flex-col lg:flex-row p-5 sm:p-8 lg:p-10 gap-6 lg:gap-8 shadow-2xl">
              
              <div className="flex-1 min-h-[25dvh] lg:min-h-0 bg-background-3/50 rounded-2xl border border-text/5 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-tr from-transparent to-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="geistMono text-xs md:text-sm text-text/30">IMAGE_PLACEHOLDER_{index + 1}.PNG</p>
              </div>

              <div className="flex-1 flex flex-col justify-center py-2 lg:py-0 overflow-y-auto">
                <p className="geistMono text-[10px] sm:text-xs text-text/40 mb-3 md:mb-4 tracking-widest">0{index + 1} / 0{DUMMY_PROJECTS.length}</p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-text shrink-0">{project.title}</h3>
                <p className="text-base sm:text-lg text-text/60 leading-relaxed mb-6 md:mb-8 max-w-lg">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 md:gap-3 mt-auto lg:mt-0">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-background-3 rounded-full text-[10px] md:text-xs geistMono text-text/70 border border-text/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}