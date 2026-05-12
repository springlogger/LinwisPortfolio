"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/src/shared/lib/gsap';
import { SKILLS_DATA } from '../model/skills.data';

export const SkillsSection = () => {
  const stageRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!stageRef.current) return;
    
    // Check if device is touch-based (no hover)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>('.skill-item', stageRef.current);
    const radius = 250;
    const maxScale = 1.25;
    const dur = 0.3;

    const onMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const d = Math.hypot(
          e.clientX - (r.left + r.width / 2),
          e.clientY - (r.top + r.height / 2)
        );
        const p = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, radius, 1, 0, d));
        
        gsap.to(card, {
          scale: 1 + (maxScale - 1) * p,
          opacity: 0.5 + 0.5 * p, // Also subtly increase opacity when near
          duration: dur,
          overwrite: "auto",
          ease: "power2.out"
        });
      });
    };

    const onMouseLeave = () => {
      gsap.to(cards, {
        scale: 1,
        opacity: 1, // Return to default CSS opacity
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    stageRef.current.addEventListener('mousemove', onMouseMove);
    stageRef.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      stageRef.current?.removeEventListener('mousemove', onMouseMove);
      stageRef.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, { scope: stageRef });

  return (
    <section ref={stageRef} className='h-svh w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto'>
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-[0.2em] md:tracking-[0.5em] text-text/10 mb-16 lg:mb-24">
        TECH STACK
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {SKILLS_DATA.map((category, index) => (
          <div key={index} className="flex flex-col gap-4 group">
            <h3 className="geistMono text-sm text-text/40 uppercase tracking-widest border-b border-text/10 pb-4 mb-4 transition-colors group-hover:text-text/70">
              {category.title}
            </h3>
            <ul className="flex flex-col gap-3 text-2xl lg:text-3xl text-text/80 font-medium">
              {category.skills.map((skill, i) => (
                <li key={i} className="skill-item origin-left w-fit transition-colors hover:text-text cursor-default">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
