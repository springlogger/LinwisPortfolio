import React from 'react'

export const AboutSection = () => {
  return (
    <section className='h-dvh flex flex-col justify-around items-center'>
      <header>
        <p className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[1em] cursor-default text-center px-4'>ABOUT ME</p>
      </header>
      <main className='w-full px-6 sm:px-10 lg:px-16 max-w-7xl'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8'>
          <div className='flex-1 flex justify-center md:justify-end items-center text-3xl font-semibold w-full md:w-1/2'>
            <p className='md:w-3/4 text-center md:text-right'>Who am i?</p>
          </div>
          <div className='flex-1 flex justify-center md:justify-start items-center w-full md:w-1/2'>
            <p className='text-lg sm:text-xl md:w-3/4 text-text/80 text-center md:text-left leading-relaxed'>
              Full Stack Developer <br className="hidden md:block" /> passionate about building innovative and user-friendly
              web applications. With experience in both front-end and back-end technologies, I enjoy
              creating seamless and efficient solutions that make a difference. My goal is to leverage
              my skills to solve real-world problems and contribute to meaningful projects that
              inspire and delight users.
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}