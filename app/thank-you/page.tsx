
export default function ThankYou() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Thank you.</h1>
      <p className="mt-2 text-neutral-700">
        We’ve received your request. A counselor will reach out with your Terrain Decode next steps.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="https://calendly.com/mehul-lifely"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-2xl bg-neutral-900 px-6 py-3 text-white"
        >
          Book a Call on Calendly
        </a>
        <a href="/" className="inline-flex rounded-2xl border border-neutral-300 px-6 py-3">
          Back to Home
        </a>
      </div>
    </main>
  )
}
