"use client"

import Image from "next/image";
import Logo from "@/src/assets/LinwisLogo.svg";
import { SplitTubeText } from "@/src/shared/ui/SplitTubeText";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { ScrollTrigger, gsap } from "@/src/shared/lib/gsap";

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (!headerRef.current) return;

        // Обновляем состояние для смены макета
        if (self.scroll() > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        // Показываем/прячем всю шапку целиком
        if (self.direction === 1 && self.scroll() > 50) {
          gsap.to(
            headerRef.current, 
            { yPercent: -100, duration: 1, ease: "power3.out" }
          );
        } else {
          gsap.to(
            headerRef.current, 
            { yPercent: 0, duration: 1, ease: "power3.out" }
          );
        }
      }
    })
  }, {scope: headerRef})

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 pt-6 px-4 sm:px-8 lg:px-16 pointer-events-none">
      <div 
        className={`group relative mx-auto flex items-center pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? "w-fit gap-x-0 px-2 bg-background/20 backdrop-blur-md cursor-pointer" 
            : "w-full gap-x-10 px-0 py-0 justify-between bg-transparent"
        }`}
      >
        {/* Угловые рамки (sci-fi bracket effect) - видны только при скролле */}
        <span className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-text/40 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 ${isScrolled ? "opacity-100" : "opacity-0"}`} />
        <span className={`absolute top-0 right-0 w-3 h-3 border-t border-r border-text/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1 ${isScrolled ? "opacity-100" : "opacity-0"}`} />
        <span className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l border-text/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isScrolled ? "opacity-100" : "opacity-0"}`} />
        <span className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-text/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 ${isScrolled ? "opacity-100" : "opacity-0"}`} />

        {/* Logo */}
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center ${
          isScrolled ? "max-w-0 opacity-0 pointer-events-none" : "max-w-25 opacity-100"
        }`}>
          <Image 
            className="w-12 h-12 shrink-0" 
            src={Logo} 
            alt="Linwis logo" 
            priority 
          />
        </div>

        {/* Center Section: Full Nav and Compact Menu */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          {/* Full Nav */}
          <nav 
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden hidden md:flex items-center ${
              isScrolled 
                ? "max-w-0 opacity-0 pointer-events-none" 
                : "max-w-2xl opacity-100"
            }`}
          >
            <ul className="flex flex-row items-center gap-x-8 lg:gap-x-10 geistMono text-sm uppercase text-text/70 whitespace-nowrap px-4">
              <li className="cursor-pointer transition-colors hover:text-text">
                <SplitTubeText className="text-base lg:text-lg" text="Portfolio" />
              </li>
              <li className="cursor-pointer transition-colors hover:text-text">
                <SplitTubeText className="text-base lg:text-lg" text="About" />
              </li>
              <li className="cursor-pointer transition-colors hover:text-text">
                <SplitTubeText className="text-base lg:text-lg" text="Projects" />
              </li>
            </ul>
          </nav>

          {/* Compact Menu */}
          <div 
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center ${
              isScrolled 
                ? "max-w-37.5 opacity-100 px-4" 
                : "max-w-37.5 md:max-w-0 md:opacity-0 md:pointer-events-none px-4 md:px-0"
            }`}
          >
            <span className="geistMono text-sm uppercase text-text/80 transition-colors group-hover:text-text whitespace-nowrap">
              Menu
            </span>
          </div>
        </div>

        {/* Let's talk */}
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center ${
          isScrolled ? "max-w-0 opacity-0 pointer-events-none" : "max-w-50 opacity-100"
        }`}>
          <p className="geistMono cursor-pointer shrink-0 uppercase text-text/80 transition-colors hover:text-text whitespace-nowrap text-base lg:text-lg">
            Let&apos;s talk
          </p>
        </div>
      </div>
    </header>
  )
}