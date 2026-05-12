"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/src/shared/lib/gsap';

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(".about-reveal", 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%", // Triggers later when section is mostly visible
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className='h-svh flex flex-col justify-center items-center gap-12 lg:gap-20'>
      <header className="about-reveal">
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[1em] cursor-default text-center px-4'>
          ABOUT ME
        </h2>
      </header>
      
      <main className='w-full px-6 sm:px-10 lg:px-16 max-w-7xl'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16'>
          <div className='about-reveal flex-1 flex justify-center md:justify-end items-center text-4xl lg:text-5xl font-semibold w-full md:w-1/2'>
            <p className='md:w-3/4 text-center md:text-right leading-tight'>Who am I?</p>
          </div>
          
          <div className='flex-1 flex justify-center md:justify-start items-center w-full md:w-1/2'>
            <p className='about-reveal text-lg sm:text-xl lg:text-2xl md:w-5/6 text-text/70 text-center md:text-left leading-relaxed font-light'>
              A <span className="text-text font-medium">Frontend Developer</span> with 3 years of experience building interactive applications. 
              My main focus is <span className="text-text font-medium">browser-based 3D content</span>, including WebXR, AR, and VR.
              <br/><br/>
              I design clean architectures, write precise math for custom rendering pipelines, and obsess over delivering <span className="text-text font-medium">silky smooth UI performance</span>.
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}