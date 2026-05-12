import React from 'react'

export const ContactSection = () => {
  return (
    <section className='h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto'>
      <div className="max-w-4xl">
        <p className="geistMono text-sm text-text/40 uppercase tracking-widest mb-8">
          Let&apos;s build something
        </p>
        
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-text mb-12 lg:mb-20 leading-[0.9]">
          Got a project? <br className="hidden sm:block" />
          <span className="text-text/30 hover:text-text transition-colors duration-500 cursor-default">Let&apos;s talk.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-12 sm:gap-24">
          <div className="flex flex-col gap-2">
            <span className="geistMono text-xs text-text/40 uppercase">Email</span>
            <a href="mailto:turbinvr1@gmail.com" className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors">
              turbinvr1@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="geistMono text-xs text-text/40 uppercase">Phone</span>
            <a href="tel:+79383551569" className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors">
              +7 (938) 355-15-69
            </a>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="geistMono text-xs text-text/40 uppercase">Socials</span>
            <div className="flex flex-wrap gap-6">
              <a href="https://github.com/springlogger" target="_blank" rel="noreferrer" className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors underline underline-offset-4 decoration-text/20 hover:decoration-text">
                GitHub
              </a>
              <a href="https://leetcode.com/u/Linwis/" target="_blank" rel="noreferrer" className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors underline underline-offset-4 decoration-text/20 hover:decoration-text">
                LeetCode
              </a>
              <a href="https://hh.ru/resume/46f4eecdff0bd33c290039ed1f616835516c47" target="_blank" rel="noreferrer" className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors underline underline-offset-4 decoration-text/20 hover:decoration-text">
                HeadHunter
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="geistMono text-xs text-text/40 uppercase">Resume</span>
            <div className="flex flex-wrap gap-6">
              <a href="/Frontend_Developer_Resume_Linwis.pdf" download className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors underline underline-offset-4 decoration-text/20 hover:decoration-text">
                PDF
              </a>
              <a href="/Frontend_Developer_Resume_Linwis.docx" download className="text-xl sm:text-2xl text-text/80 hover:text-text transition-colors underline underline-offset-4 decoration-text/20 hover:decoration-text">
                DOCX
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}