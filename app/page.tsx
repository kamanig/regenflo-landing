// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          ReGenflō — Build the Human Foundation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
          From managing symptoms to rebuilding resilience. Upgrade energy,
          immunity and recovery with a systems-first approach.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/blog"
            className="rounded-xl bg-black px-5 py-3 text-white shadow-md transition hover:bg-neutral-800"
          >
            Read the Blog
          </Link>

          <a
            href="https://calendly.com/mehul-lifely"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-neutral-300 px-5 py-3 shadow-sm transition hover:bg-neutral-50"
          >
            Book a Call
          </a>

          <a
            href="https://wa.me/919726616008"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-green-200 px-5 py-3 text-green-700 shadow-sm transition hover:bg-green-50"
          >
            WhatsApp +91 97266 16008
          </a>
        </div>

        <p className="mt-3 text-sm text-neutral-500">
          Or email us at{" "}
          <a
            className="underline"
            href="mailto:care@lifely.ae?subject=ReGenfl%C5%8D%20Inquiry"
          >
            care@lifely.ae
          </a>
          .
        </p>
      </section>

      {/* Value props */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Terrain over Symptoms</h3>
          <p className="mt-2 text-neutral-600">
            We correct energy, minerals, circadian &amp; stress systems—the
            “soil” that grows lasting health.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Simple, Compounding Habits</h3>
          <p className="mt-2 text-neutral-600">
            Tiny daily levers that stack: light, sleep, nourishment, movement,
            breath, mindset.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Measurable Outcomes</h3>
          <p className="mt-2 text-neutral-600">
            Track capacity gains: morning energy, recovery, HRV, focus, mood,
            and training tolerance.
          </p>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="mt-16 rounded-2xl bg-neutral-50 p-8 text-center">
        <h2 className="text-2xl font-bold">Start your reset</h2>
        <p className="mt-2 text-neutral-600">
          15-minute call to map your bottlenecks and the first 3 levers to pull.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://calendly.com/mehul-lifely"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-black px-5 py-3 text-white shadow-md transition hover:bg-neutral-800"
          >
            Book on Calendly
          </a>
          <Link
            href="/blog"
            className="rounded-xl border border-neutral-300 px-5 py-3 shadow-sm transition hover:bg-white"
          >
            Explore Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
