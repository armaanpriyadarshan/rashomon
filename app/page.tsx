export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-black pt-[25vh]">
      <div>
        <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-extralight tracking-widest text-zinc-400">
          RASHŌMON&#8202;·&#8202;<em>羅生門</em>
        </h1>
        <p className="mt-6 max-w-2xl font-[family-name:var(--font-jetbrains-mono)] text-sm font-light leading-relaxed tracking-wide text-zinc-500">
          rashōmon represents the subjectivity of truth through differing mental models that arise from the same reality.
          <br /><br />
          to understand ourselves, we must understand each other.
          <br /><br />
          can you model another mind better than other intelligence?
        </p>
      </div>
    </div>
  );
}
