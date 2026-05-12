"use client";

import { useGSAP } from '@gsap/react';
import { gsap } from '@/src/shared/lib/gsap';
import React, { useRef, useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import type { Project } from '../model/types';
import { DUMMY_PROJECTS } from '../model/projects.data';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const introWidthVW = 24;
  
  const lenis = useLenis();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalScrollVW = introWidthVW + (DUMMY_PROJECTS.length - 1) * 100;

      const snapPoints = [0];
      let currentX = introWidthVW;
      for (let i = 0; i < DUMMY_PROJECTS.length; i++) {
        snapPoints.push(currentX / totalScrollVW);
        currentX += 100;
      }

      gsap.to(containerRef.current, {
        x: () => `-${totalScrollVW}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects-panel",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45, 
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.1, max: 0.3 },
            delay: 0,
            ease: "power2.out", 
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [selectedProject, lenis]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const target = e.target as HTMLDivElement;
    const scrollPosition = target.scrollLeft;
    const index = Math.round(scrollPosition / window.innerWidth);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <section className='h-svh w-full relative flex flex-col justify-center overflow-hidden'>
        <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-[0.2em] md:tracking-[0.5em] text-text/10">SELECTED WORK</h2>
        </div>

        {/* Wrapper for Native Scroll on Mobile */}
        <div 
          ref={scrollWrapperRef}
          onScroll={handleScroll}
          data-lenis-prevent="true"
          className="w-full h-full overflow-x-auto md:overflow-visible snap-x snap-mandatory flex md:block [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x touch-pan-y"
        >
          <div 
            ref={containerRef}
            className="flex h-full w-max md:will-change-transform"
          >
            {/* Intro Slide (Desktop Only) */}
            <div
              className="h-full shrink-0 hidden md:flex flex-col items-center justify-center relative"
              style={{ width: `${introWidthVW}vw` }}
            >
              <div className="flex flex-col items-center gap-6 opacity-30 mt-20">
                <span className="geistMono text-sm tracking-[0.5em] uppercase text-text text-center w-full max-w-[200px]">Scroll to explore</span>
                <div className="w-px h-32 bg-linear-to-b from-text to-transparent animate-pulse" />
              </div>
            </div>

            {DUMMY_PROJECTS.map((project, index) => (
              <ProjectCard 
                key={index}
                project={project}
                index={index}
                totalProjects={DUMMY_PROJECTS.length}
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex md:hidden gap-2 z-20 pointer-events-none">
          {DUMMY_PROJECTS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-text/80' : 'w-1.5 bg-text/20'}`} 
            />
          ))}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  )
}
