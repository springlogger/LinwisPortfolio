"use client"

import Image from "next/image";
import Logo from "@/src/assets/LinwisLogo.svg";
import { SplitTubeText } from "@/src/shared/ui/SplitTubeText";
import { desktopNavLinks } from "../model/navigation";
import { useHeaderVisibility } from "../lib/useHeaderVisibility";
import { useSiteMenu } from "../lib/useSiteMenu";
import { SiteMenuOverlay } from "./SiteMenuOverlay";

export const Header = () => {
  const { headerRef, isHeaderHidden, isScrolled, setHeaderHidden } = useHeaderVisibility();
  const {
    closeMenu,
    closeMenuButtonRef,
    finishClosing,
    handleNavigate,
    isMenuVisible,
    menuState,
    openMenu,
  } = useSiteMenu({ setHeaderHidden });

  const headerButtonClass =
    "geistMono inline-flex items-center text-text transition-colors hover:text-text/70 whitespace-nowrap cursor-pointer";
  const headerTextClass =
    "geistMono text-sm lg:text-base font-semibold uppercase tracking-[0.12em]";
  const isHeaderVisible = !isHeaderHidden;
  const isFullHeaderVisible = !isScrolled && isHeaderVisible;
  const isCompactHeaderVisible = isScrolled && !isHeaderHidden;
  const fullHeaderStateClass = isHeaderHidden
    ? "-translate-y-2 opacity-0 pointer-events-none"
    : isScrolled
      ? "translate-y-0 opacity-100 md:-translate-y-2 md:opacity-0 md:pointer-events-none"
      : "translate-y-0 opacity-100";

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 pt-[max(1rem,env(safe-area-inset-top))] px-6 sm:pt-6 sm:px-8 lg:px-16 pointer-events-none">
        <div className="relative mx-auto min-h-12 w-full">
          <div
            className={`flex min-h-12 w-full items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-10 pointer-events-auto transition-[opacity,transform] duration-300 ease-out ${fullHeaderStateClass}`}
            aria-hidden={!isHeaderVisible}
          >
            <div className="flex items-center">
              <Image
                className="w-11 h-11 sm:w-12 sm:h-12 shrink-0"
                src={Logo}
                alt="Linwis logo"
                priority
              />
            </div>

            <nav className="hidden md:flex items-center justify-center">
              <ul className="flex flex-row items-center gap-x-5 lg:gap-x-8 whitespace-nowrap px-3 lg:px-4">
                {desktopNavLinks.map((link) => (
                  <li key={link.targetId}>
                    <button type="button" onClick={() => handleNavigate(link.targetId)} className={headerButtonClass} tabIndex={isFullHeaderVisible ? 0 : -1}>
                      <SplitTubeText className={headerTextClass} text={link.label} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:flex items-center justify-end">
              <button type="button" onClick={() => handleNavigate("contact")} className={headerButtonClass} tabIndex={isFullHeaderVisible ? 0 : -1}>
                <SplitTubeText className={headerTextClass} text="Let's talk" />
              </button>
            </div>

            <button
              type="button"
              onClick={openMenu}
              className={`${headerButtonClass} md:hidden`}
              aria-haspopup="dialog"
              aria-expanded={isMenuVisible}
              tabIndex={isHeaderVisible ? 0 : -1}
            >
              <SplitTubeText className={headerTextClass} text="Menu" />
            </button>
          </div>

          <div
            className={`group absolute top-0 left-1/2 hidden min-h-12 -translate-x-1/2 items-center bg-background/20 px-2 backdrop-blur-md pointer-events-auto transition-[opacity,transform] duration-300 ease-out md:flex ${
              isCompactHeaderVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isCompactHeaderVisible}
          >
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-text/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-text/40 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-text/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-text/40 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />

            <button
              type="button"
              onClick={openMenu}
              className={`${headerButtonClass} px-4`}
              aria-haspopup="dialog"
              aria-expanded={isMenuVisible}
              tabIndex={isCompactHeaderVisible ? 0 : -1}
            >
              <SplitTubeText className={headerTextClass} text="Menu" />
            </button>
          </div>
        </div>
      </header>

      <SiteMenuOverlay
        closeButtonRef={closeMenuButtonRef}
        isVisible={isMenuVisible}
        menuState={menuState}
        onClose={closeMenu}
        onFinishClosing={finishClosing}
        onNavigate={handleNavigate}
      />
    </>
  )
}
