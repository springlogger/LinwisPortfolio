import React from 'react';
import Image from 'next/image';
import type { Project } from '../model/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  totalProjects: number;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalProjects, onOpenModal }) => {
  const actionBaseClass =
    "h-11 px-5 rounded-xl text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2";

  return (
    <div className="h-full w-screen shrink-0 snap-center flex flex-col items-center justify-center px-4 pt-2 pb-12 sm:px-8 sm:pt-4 sm:pb-14 md:px-12 md:pt-4 md:pb-12 lg:px-24 lg:pb-16 relative">
      <div className="w-full max-w-6xl h-full max-h-full lg:max-h-[68svh] bg-background-2/60 backdrop-blur-md border border-text/10 rounded-3xl flex flex-col lg:flex-row p-5 sm:p-8 lg:p-10 gap-6 lg:gap-8 shadow-2xl">
        
        <div className="flex-1 min-h-[25svh] lg:min-h-0 bg-background-3/50 rounded-2xl border border-text/5 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-tr from-transparent to-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          {project.image ? (
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
            />
          ) : (
            <p className="geistMono text-xs md:text-sm text-text/30 relative z-20">IMAGE_PLACEHOLDER_{index + 1}.PNG</p>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center py-2 lg:py-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <p className="geistMono text-[10px] sm:text-xs text-text/40 mb-3 md:mb-4 tracking-widest">
            0{index + 1} / 0{totalProjects}
          </p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-text shrink-0">{project.title}</h3>
          <p className="text-base sm:text-lg text-text/60 leading-relaxed mb-6 md:mb-8 max-w-lg line-clamp-3 md:line-clamp-none">
            {project.desc}
          </p>
          
          <div className="mt-auto flex flex-col gap-5">
            <div className="flex flex-wrap gap-2 md:gap-3 items-center">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-background-3 rounded-full text-[10px] md:text-xs geistMono text-text/70 border border-text/10">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onOpenModal(project)}
                className={`${actionBaseClass} border border-text/20 text-text hover:bg-text hover:text-background cursor-pointer`}
              >
                Details
              </button>

              {project.deploy ? (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noreferrer"
                  className={`${actionBaseClass} bg-text text-background hover:bg-text/80`}
                >
                  Try
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className={`${actionBaseClass} border border-text/10 text-text/25 cursor-not-allowed`}
                  aria-label="Demo is not available"
                >
                  Try
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
