import { HeroSection } from "../widgets/hero/ui/HeroSection";

export default function Home() {
  return (
    <div>
      {/* <header className="sticky flex justify-between items-center px-16 py-4 h-24">
        <CornerOutline className="h-16 p-2 px-4 flex justify-center items-center text-text">
          <Image className="w-16 h-16" src={Logo} alt="logo"/>
        </CornerOutline>
        <CornerOutline className="h-16 p-2 px-4 flex justify-center items-center text-text flex-row gap-x-2">
          <p className="text-2xl">MENU</p>
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="#ededed" viewBox="0 0 640 640">
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/>
          </svg>
        </CornerOutline>
        <CornerOutline className="h-16 p-2 px-4 flex justify-center items-center text-text">
          <p className="text-2xl">LET'S TALK</p>
        </CornerOutline>
      </header> */}
      <main className="flex flex-col items-center justify-center">
        <HeroSection />
        {/* <section className="h-screen" id="hero">
          ABOUT
        </section> */}
      </main>
      <footer></footer>
    </div>
  );
}
