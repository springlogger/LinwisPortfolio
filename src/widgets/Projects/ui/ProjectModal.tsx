import React from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../model/types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const actionBaseClass =
    "min-h-12 w-[7.5rem] sm:w-auto px-5 rounded-xl text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2";

  if (typeof document === 'undefined') return null;

  const blockPageGesture = (event: React.WheelEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (!(event.target as Element).closest('[data-project-modal-scroll="true"]')) {
      event.preventDefault();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      onTouchMove={blockPageGesture}
      onWheel={blockPageGesture}
    >
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full md:max-w-3xl max-h-[calc(100dvh-0.75rem)] md:max-h-[85svh] bg-background border border-text/10 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-text/10 shrink-0 bg-background-2/50 backdrop-blur-md">
          <h3 id="project-modal-title" className="text-xl md:text-3xl font-bold text-text truncate pr-4">{project.title}</h3>
          <button
            onClick={onClose}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-background-3 hover:bg-text hover:text-background transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-h-0 p-5 md:p-8 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-text/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-text/40 transition-colors" data-lenis-prevent="true" data-project-modal-scroll="true">
          <p className="text-base md:text-lg text-text/80 mb-6 leading-relaxed">{project.desc}</p>

          <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1.5 bg-background-3 rounded-full text-xs geistMono text-text/70 border border-text/10">
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <h4 className="text-sm geistMono uppercase text-text/40 tracking-widest">Key Features & Achievements</h4>
            <ul className="space-y-5">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-4 text-text/70">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-text/30 shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="shrink-0 border-t border-text/10 bg-background-2/80 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8 md:py-6">
          <div className="flex justify-end gap-2 sm:gap-3">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className={`${actionBaseClass} border border-text/20 text-text hover:bg-text hover:text-background`}>
                Source
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            ) : (
              <button type="button" disabled className={`${actionBaseClass} border border-text/10 text-text/25 cursor-not-allowed`}>
                Source
              </button>
            )}

            {project.deploy ? (
              <a href={project.deploy} target="_blank" rel="noreferrer" className={`${actionBaseClass} bg-text text-background hover:bg-text/80`}>
                Try
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            ) : (
              <button type="button" disabled className={`${actionBaseClass} border border-text/10 text-text/25 cursor-not-allowed`} aria-label="Demo is not available">
                Try
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
