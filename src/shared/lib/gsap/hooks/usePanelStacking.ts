import { useGSAP } from "@gsap/react";
import { gsap } from "@/src/shared/lib/gsap";
import type React from "react";

export const usePanelStacking = (containerRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.panel');
    panels.forEach((panel, i) => {
      // Don't animate the last panel
      if (i === panels.length - 1) return;
      
      const inner = panel.querySelector('.panel-inner');
      const nextPanel = panels[i + 1];
      
      if (!inner || !nextPanel) return;

      gsap.fromTo(inner, 
        { 
          scale: 1, 
          filter: 'brightness(1)',
          borderRadius: "0px"
        },
        {
          scale: 0.9,
          filter: 'brightness(0.5)',
          borderRadius: "32px",
          transformOrigin: "top center",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: nextPanel,
            start: "top bottom",
            end: "top top",
            scrub: 1, // slight smoothing on scrub
          }
        }
      );
    });
  }, { scope: containerRef });
};
