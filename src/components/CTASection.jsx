import Link from "next/link";

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 text-white sm:px-6 lg:px-8">
      {/* Grid Glow Background */}
      <div className="absolute inset-x-0 top-0 mx-auto h-[360px] max-w-6xl rounded-b-full bg-[radial-gradient(circle_at_top,rgba(81,32,226,0.7),rgba(81,32,226,0.18)_35%,transparent_70%)]" />

      {/* Arc Grid */}
      <div className="absolute inset-x-0 top-0 mx-auto h-[380px] max-w-6xl overflow-hidden rounded-b-full opacity-40">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mt-5 text-sm text-white/55 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Create a free account
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;