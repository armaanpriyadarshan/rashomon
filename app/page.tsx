import WoodblockScene from "./clouds";

export default function Home() {
  return (
    <div className="relative flex min-h-screen justify-center overflow-hidden bg-[#faf8e1] pt-[25vh]">
      <WoodblockScene />
      <a
        href="https://github.com/armaanpriyadarshan/rashomon"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-6 top-6 text-[#241e20]/40 transition-colors hover:text-[#241e20]/70 z-10 animate-fade-in"
        style={{ animationDelay: "1.2s" }}
        aria-label="GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="inline-block bg-white p-1 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="border border-[#241e20] px-6 py-4">
            <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-normal tracking-widest text-[#241e20]">
              RASHŌMON&#8202;|&#8202;羅生門
            </h1>
            <p className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-xs font-light leading-relaxed tracking-wide text-[#241e20]/60">
              &quot;what is the life of a human being—
              <br />
              a drop of dew, a flash of lightning?&quot;
              <br />
              — ryūnosuke akutagawa
            </p>
          </div>
        </div>
        <p
          className="mt-6 w-full font-[family-name:var(--font-jetbrains-mono)] text-sm font-light leading-relaxed tracking-wide text-[#241e20] animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          do you understand your mind better than another intelligence?
        </p>
        <a
          href="/play"
          className="mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-xs font-light tracking-widest text-[#241e20] transition-colors hover:text-[#241e20]/70 animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          let&apos;s see
        </a>
      </div>
    </div>
  );
}
