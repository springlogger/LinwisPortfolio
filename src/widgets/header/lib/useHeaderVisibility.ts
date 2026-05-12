import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap } from "@/src/shared/lib/gsap";

export const useHeaderVisibility = () => {
  const headerRef = useRef<HTMLElement>(null);
  const isHiddenRef = useRef(false);
  const lastScrollRef = useRef(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const setHeaderHidden = useCallback((hidden: boolean) => {
    if (isHiddenRef.current === hidden) return;

    isHiddenRef.current = hidden;
    setIsHeaderHidden(hidden);

    const header = headerRef.current;
    if (!header) return;

    gsap.to(header, {
      yPercent: hidden ? -120 : 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    const handleProjectModalToggle = (event: Event) => {
      const isOpen = event instanceof CustomEvent && Boolean(event.detail?.open);
      setHeaderHidden(isOpen);
    };

    window.addEventListener("project-modal-toggle", handleProjectModalToggle);

    if (document.documentElement.hasAttribute("data-project-modal-open")) {
      setHeaderHidden(true);
    }

    return () => {
      window.removeEventListener("project-modal-toggle", handleProjectModalToggle);
    };
  }, [setHeaderHidden]);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (!headerRef.current) return;
        const isProjectModalOpen = document.documentElement.hasAttribute("data-project-modal-open");
        const isSiteMenuOpen = document.documentElement.hasAttribute("data-menu-open");
        const currentScroll = self.scroll();
        const scrollDelta = currentScroll - lastScrollRef.current;

        lastScrollRef.current = currentScroll;
        setIsScrolled(currentScroll > 50);

        if (isProjectModalOpen || isSiteMenuOpen) {
          setHeaderHidden(true);
          return;
        }

        if (currentScroll <= 50) {
          setHeaderHidden(false);
          return;
        }

        if (scrollDelta > 6) {
          setHeaderHidden(true);
          return;
        }

        if (scrollDelta < -8) {
          setHeaderHidden(false);
        }
      },
    });

    return () => trigger.kill();
  }, { scope: headerRef });

  return {
    headerRef,
    isHeaderHidden,
    isScrolled,
    setHeaderHidden,
  };
};
