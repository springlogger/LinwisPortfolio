"use client"

import { AboutSection } from "../widgets/about/ui/AboutSection";
import { ContactSection } from "../widgets/Contact/ui/ContactSection";
import { Header } from "../widgets/header/ui/HeaderSection";
import { HeroSection } from "../widgets/hero/ui/HeroSection";
import { ProjectsSection } from "../widgets/Projects/ui/ProjectsSection";
import { SkillsSection } from "../widgets/Skills/ui/SkillsSection";
import { useRef } from "react";

import { usePanelStacking } from "@/src/shared/lib/gsap/hooks/usePanelStacking";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  usePanelStacking(containerRef);

  return (
    <div ref={containerRef}>
      <Header/>
      <main className="relative flex flex-col items-center justify-center w-full">
        <div className="panel sticky top-0 h-dvh w-full overflow-hidden">
          <div className="panel-inner h-full w-full bg-background relative will-change-transform">
            <HeroSection />
          </div>
        </div>
        
        <div className="panel sticky top-0 h-dvh w-full overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <div className="panel-inner h-full w-full bg-background relative will-change-transform">
            <AboutSection />
          </div>
        </div>
        
        <div className="panel sticky top-0 h-dvh w-full overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <div className="panel-inner h-full w-full bg-background relative will-change-transform">
            <SkillsSection />
          </div>
        </div>
        
        <div className="panel sticky top-0 h-[500dvh] w-full shadow-[0_-10px_30px_rgba(0,0,0,0.5)]" id="projects-panel">
          <div className="panel-inner sticky top-0 h-dvh w-full bg-background overflow-hidden will-change-transform">
            <ProjectsSection />
          </div>
        </div>
        
        <div className="panel sticky top-0 min-h-dvh w-full overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="panel-inner flex-1 w-full bg-background relative flex flex-col will-change-transform">
            <div className="flex-1">
              <ContactSection />
            </div>
            <footer className="h-12 w-full flex items-center justify-center text-text/50 geistMono text-xs border-t border-text/10">
              Linwis Portfolio © 2026
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
