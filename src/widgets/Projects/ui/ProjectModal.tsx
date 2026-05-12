import React from 'react';
import type { Project } from '../model/types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      
      <div className="relative w-full md:max-w-3xl max-h-[90svh] md:max-h-[85svh] bg-background border border-text/10 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-text/10 shrink-0 bg-background-2/50 backdrop-blur-md">
          <h3 className="text-2xl md:text-3xl font-bold text-text truncate pr-4">{project.title}</h3>
          <button 
            onClick={onClose} 
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-background-3 hover:bg-text hover:text-background transition-colors text-lg cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-text/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-text/40 transition-colors" data-lenis-prevent="true">
          <p className="text-lg text-text/80 mb-6 leading-relaxed">{project.desc}</p>
          
          <div className="flex flex-wrap gap-2 mb-10">
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
                  <span className="text-text/30 mt-1 shrink-0 text-sm">▹</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.github && (
            <div className="mt-12 mb-4">
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-text text-background font-bold rounded-full hover:bg-text/80 transition-colors">
                View Source Code
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
