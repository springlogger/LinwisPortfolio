import { useEffect, useRef, useState } from "react";
import type { MenuState } from "../model/navigation";

type UseSiteMenuOptions = {
  setHeaderHidden: (hidden: boolean) => void;
};

export const useSiteMenu = ({ setHeaderHidden }: UseSiteMenuOptions) => {
  const closeMenuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingNavigationRef = useRef<string | null>(null);
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const isMenuOpen = menuState === "open";
  const isMenuVisible = menuState !== "closed";

  useEffect(() => {
    const siteShell = document.getElementById("site-shell");

    document.documentElement.toggleAttribute("data-menu-open", isMenuVisible);
    window.dispatchEvent(new CustomEvent("site-menu-toggle", { detail: { open: isMenuVisible } }));

    if (isMenuVisible) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      siteShell?.setAttribute("inert", "");
      siteShell?.setAttribute("aria-hidden", "true");
      setHeaderHidden(true);

      if (isMenuOpen) {
        window.requestAnimationFrame(() => closeMenuButtonRef.current?.focus());
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      siteShell?.removeAttribute("inert");
      siteShell?.removeAttribute("aria-hidden");
      setHeaderHidden(false);

      if (pendingNavigationRef.current) {
        const targetId = pendingNavigationRef.current;
        pendingNavigationRef.current = null;

        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    return () => {
      document.documentElement.removeAttribute("data-menu-open");
      window.dispatchEvent(new CustomEvent("site-menu-toggle", { detail: { open: false } }));
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      siteShell?.removeAttribute("inert");
      siteShell?.removeAttribute("aria-hidden");
    };
  }, [isMenuOpen, isMenuVisible, setHeaderHidden]);

  const openMenu = () => setMenuState("open");

  const closeMenu = () => {
    setMenuState((current) => current === "closed" ? current : "closing");
  };

  const finishClosing = () => {
    setMenuState("closed");
  };

  const handleNavigate = (targetId: string) => {
    if (!isMenuVisible) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    pendingNavigationRef.current = targetId;
    setMenuState("closing");
  };

  return {
    closeMenu,
    closeMenuButtonRef,
    finishClosing,
    handleNavigate,
    isMenuVisible,
    menuState,
    openMenu,
  };
};
