import { createPortal } from "react-dom";
import type { RefObject } from "react";
import { externalLinks, pageLinks, type MenuState } from "../model/navigation";

type SiteMenuOverlayProps = {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  isVisible: boolean;
  menuState: MenuState;
  onClose: () => void;
  onFinishClosing: () => void;
  onNavigate: (targetId: string) => void;
};

export const SiteMenuOverlay = ({
  closeButtonRef,
  isVisible,
  menuState,
  onClose,
  onFinishClosing,
  onNavigate,
}: SiteMenuOverlayProps) => {
  if (!isVisible || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`site-menu-overlay fixed inset-0 z-[900] bg-background ${menuState === "closing" ? "site-menu-overlay--closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-menu-title"
      data-lenis-prevent="true"
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      onAnimationEnd={(event) => {
        if (event.currentTarget === event.target && menuState === "closing") {
          onFinishClosing();
        }
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-text/20" />
      <div className="flex h-dvh flex-col justify-between overflow-y-auto overscroll-contain px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <p id="site-menu-title" className="geistMono text-xs font-bold uppercase tracking-[0.45em] text-text/40">
            Navigation
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="h-12 w-12 rounded-full border border-text/15 bg-background-3 text-text/80 transition-colors hover:bg-text hover:text-background cursor-pointer inline-flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="my-10">
          <ul className="flex flex-col gap-3 sm:gap-4">
            {pageLinks.map((link, index) => (
              <li key={link.targetId}>
                <button
                  type="button"
                  onClick={() => onNavigate(link.targetId)}
                  className="group flex w-full items-center justify-between border-b border-text/10 py-3 text-left text-text transition-colors hover:text-text/60 cursor-pointer"
                >
                  <span className="geistMono text-[clamp(2.5rem,10vw,7rem)] font-bold uppercase leading-none tracking-normal">
                    {link.label}
                  </span>
                  <span className="geistMono text-xs text-text/35 transition-transform group-hover:translate-x-1">
                    0{index + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 border-t border-text/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="geistMono text-xs font-bold uppercase tracking-[0.2em] text-text/50 transition-colors hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <a href="/Frontend_Developer_Resume_Linwis.pdf" download className="geistMono text-xs font-bold uppercase tracking-[0.2em] text-text/50 transition-colors hover:text-text">
              Resume PDF
            </a>
            <a href="/Frontend_Developer_Resume_Linwis.docx" download className="geistMono text-xs font-bold uppercase tracking-[0.2em] text-text/50 transition-colors hover:text-text">
              Resume DOCX
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
