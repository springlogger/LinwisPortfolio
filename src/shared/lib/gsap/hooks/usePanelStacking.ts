import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/src/shared/lib/gsap";
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

    let refreshCall: ReturnType<typeof gsap.delayedCall> | null = null;
    let lastViewportWidth = window.visualViewport?.width ?? window.innerWidth;
    let lastViewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const scheduleRefresh = (delay = 0.16) => {
      refreshCall?.kill();
      refreshCall = gsap.delayedCall(delay, () => ScrollTrigger.refresh());
    };

    const refreshAfterViewportResize = () => {
      const nextViewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const nextViewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const widthChanged = Math.abs(nextViewportWidth - lastViewportWidth) >= 8;
      const heightChanged = Math.abs(nextViewportHeight - lastViewportHeight) >= 8;

      lastViewportWidth = nextViewportWidth;
      lastViewportHeight = nextViewportHeight;

      if (!widthChanged && !heightChanged) return;
      if (coarsePointerQuery.matches && !widthChanged) return;

      scheduleRefresh();
    };

    const refreshAfterOrientationChange = () => {
      scheduleRefresh(0.3);
    };

    window.visualViewport?.addEventListener("resize", refreshAfterViewportResize);
    window.addEventListener("resize", refreshAfterViewportResize);
    window.addEventListener("orientationchange", refreshAfterOrientationChange);

    return () => {
      refreshCall?.kill();
      window.visualViewport?.removeEventListener("resize", refreshAfterViewportResize);
      window.removeEventListener("resize", refreshAfterViewportResize);
      window.removeEventListener("orientationchange", refreshAfterOrientationChange);
    };
  }, { scope: containerRef });
};
