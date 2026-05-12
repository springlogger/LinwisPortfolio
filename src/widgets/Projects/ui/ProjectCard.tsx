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
  return (
    <div className="h-full w-screen shrink-0 snap-center flex flex-col items-center justify-center p-4 pb-12 sm:p-8 md:p-12 lg:p-24 relative">
      <div className="w-full max-w-6xl h-full max-h-[80svh] lg:max-h-[70svh] bg-background-2/60 backdrop-blur-md border border-text/10 rounded-3xl flex flex-col lg:flex-row p-5 sm:p-8 lg:p-10 gap-6 lg:gap-8 shadow-2xl">
        
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
          
          <div className='flex flex-row justify-center items-start gap-x-4'>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-auto lg:mt-0 items-center">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-background-3 rounded-full text-[10px] md:text-xs geistMono text-text/70 border border-text/10">
                  {t}
                </span>
              ))}
            </div>
            <button 
              onClick={() => onOpenModal(project)}
              className="ml-auto px-5 py-2 border border-text/20 rounded-full text-xs font-semibold hover:bg-text hover:text-background transition-colors flex items-center gap-2 cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
