'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Brain, Leaf, Activity, ShieldCheck, X, Search, Calendar, Clock, Tag } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function useSmoothScroll() {
  return (id: string) => {
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
      {children}
    </span>
  )
}

function Section({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-neutral-600">{label}</div>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-neutral-100 px-3 py-1 text-sm text-neutral-700">{children}</div>
}

const FEATURES = [
  { icon: <Brain className="h-5 w-5" />, title: 'Decode the Terrain', text: 'Map inflammatory tone, microbiome balance, methylation & detox capacity, mitochondrial output, and autonomic state. See the system, not the silo.' },
  { icon: <Leaf className="h-5 w-5" />, title: 'Feed the System', text: 'Deliver LifelyBiotic™ fermented nutrient matrices—cofactors included, circadian-aligned—so biology recognizes and uses every input.' },
  { icon: <Activity className="h-5 w-5" />, title: 'Lock the Defaults', text: 'Daily patterns for sleep–light–movement–meals that run without willpower. Consistency beats intensity. Defaults beat motivation.' },
]

const FAQS = [
  { q: 'Is this a medical treatment?', a: 'No. ReGenflō™ is a biology-first operating standard and guidance system. We work alongside your physician and never replace medical care.' },
  { q: 'How is this different from taking supplements?', a: 'We do not stack random pills. We deliver targeted, fermented nutrient matrices matched to terrains, with timing and cofactors that biology actually uses.' },
  { q: 'How fast will I notice change?', a: 'Most clients feel usable energy within 1–4 weeks. Repair compounds over months. We build what lasts.' },
  { q: 'Do I need lab tests first?', a: 'We work with your current data and recommend panels when useful. Signals + smart labs beat lab-only protocols.' },
]

// Blog data
type BlogPost = { slug: string; title: string; excerpt: string; date: string; tags: string[]; readMins: number }
const BLOG_POSTS: BlogPost[] = [
  { slug: 'signals-over-symptoms', title: 'Signals Over Symptoms: Reading the Body’s OS', excerpt: 'Pain and fatigue are messages. Translate signals into resilience instead of suppression.', date: '2025-07-12', tags: ['Foundations', 'Signals', 'Resilience'], readMins: 6 },
  { slug: 'terrain-before-tools', title: 'Terrain Before Tools: Why Ecosystem Beats Protocol', excerpt: 'The hidden cost of tool-first thinking and how terrain repair prevents repeat cycles.', date: '2025-06-28', tags: ['Foundations', 'Practicals'], readMins: 7 },
  { slug: 'energy-first', title: 'Energy First: Make Repair Possible, Performance Inevitable', excerpt: 'Mitochondria, circadian windows, and nutrient timing—the trifecta for steady usable energy.', date: '2025-05-30', tags: ['Energy', 'Circadian'], readMins: 8 },
  { slug: 'defaults-beat-motivation', title: 'Defaults Beat Motivation: Designing Days That Run Themselves', excerpt: 'Behavior architecture that survives busy seasons: light, sleep, movement, and meals on rails.', date: '2025-04-18', tags: ['Behavior', 'Design'], readMins: 5 },
  { slug: 'microbiome-to-gene-to-cell', title: 'From Microbiome → Gene → Cell: Precision Nutrient Intelligence', excerpt: 'Why fermented matrices with cofactors outperform random stacks—and how timing unlocks bioavailability.', date: '2025-03-10', tags: ['Nutrition', 'Science'], readMins: 9 },
  { slug: 'nervous-system-regulation', title: 'Your Nervous System: The Switchboard of Healing', excerpt: 'Downshift to repair, upshift to perform—practical ways to regulate the autonomic system daily.', date: '2025-02-22', tags: ['Nervous System', 'Practicals'], readMins: 6 },
]

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <Calendar className="h-3.5 w-3.5" />
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</time>
        <span className="mx-2 h-1 w-1 rounded-full bg-neutral-300" />
        <Clock className="h-3.5 w-3.5" />
        <span>{post.readMins} min read</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:underline">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-neutral-700">{post.excerpt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">
            <Tag className="h-3 w-3" /> {t}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900 hover:underline">
          Read more <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function BlogModule() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>('All')
  const [visible, setVisible] = useState(6)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    BLOG_POSTS.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return ['All', ...Array.from(s).sort()]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BLOG_POSTS.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q)
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [query, activeTag])

  const displayed = filtered.slice(0, visible)

  return (
    <Section id="blog">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Insights & Articles</h2>
        <p className="mt-2 text-neutral-700">Deep dives, practical guides, and the science behind terrain repair and resilience.</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md" role="search">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tags, topics..."
            className="w-full rounded-2xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-sm outline-none ring-black/5 focus:border-neutral-400 focus:ring-2"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by tag">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => { setActiveTag(t); setVisible(6) }}
              className={`rounded-full px-3 py-1 text-sm ${activeTag === t ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-800'}`}
              role="tab"
              aria-selected={activeTag === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayed.map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>

      {displayed.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-600">
          No articles match your search. Try a different phrase or tag.
        </div>
      )}

      {filtered.length > displayed.length && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setVisible((v) => v + 6)} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-5 py-2 text-sm">
            Load more <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/blog" className="text-sm font-medium text-neutral-900 hover:underline">View all articles →</Link>
      </div>
    </Section>
  )
}

function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState('Start my Terrain Decode')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, purpose, message, source: 'regenflo-landing' }),
      })
      if (!res.ok) throw new Error(`Lead API error: ${res.status}`)
      setSuccess(true)
      setTimeout(() => { window.location.href = '/thank-you' }, 500)
    } catch (err: any) {
      console.error(err)
      setError('We couldn’t submit the form right now. Please try again, or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5" role="dialog" aria-modal="true">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Start Your Terrain Decode</h3>
            <p className="mt-1 text-sm text-neutral-600">Tell us a little about you. We’ll reply with a clear next step.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-10 w-10" />
            <div className="text-lg font-medium">Request received</div>
            <p className="text-sm text-neutral-600">Redirecting you to the next step…</p>
            <button onClick={() => (window.location.href = '/thank-you')} className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-white">Go now</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Full name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} required className="rounded-xl border border-neutral-200 px-3 py-2 outline-none ring-black/5 focus:border-neutral-300 focus:ring-2" placeholder="Your name" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="rounded-xl border border-neutral-200 px-3 py-2 outline-none ring-black/5 focus:border-neutral-300 focus:ring-2" placeholder="you@example.com" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Phone (optional)</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="rounded-xl border border-neutral-200 px-3 py-2 outline-none ring-black/5 focus:border-neutral-300 focus:ring-2" placeholder="+91 ..." />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">What do you want help with?</label>
              <select value={purpose} onChange={(e)=>setPurpose(e.target.value)} className="rounded-xl border border-neutral-200 bg-white px-3 py-2 outline-none ring-black/5 focus:border-neutral-300 focus:ring-2">
                <option>Start my Terrain Decode</option>
                <option>Speak to a Counselor</option>
                <option>Understand the 3-Step System</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Anything else we should know?</label>
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={4} className="rounded-xl border border-neutral-200 px-3 py-2 outline-none ring-black/5 focus:border-neutral-300 focus:ring-2" placeholder="Signals you’re noticing, goals, timelines..." />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error} <a href="mailto:care@lifely.ae" className="underline">Email us</a>.
              </div>
            )}

            <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3 text-white shadow-sm transition hover:bg-neutral-800 disabled:opacity-60">
              {loading ? 'Submitting…' : 'Submit Request'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="text-xs text-neutral-500">We respect privacy. No spam. No data sales.</p>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default function Page() {
  const [open, setOpen] = useState(false)
  const scrollTo = useSmoothScroll()

  const cta = {
    startDecode: () => { (window as any)?.dataLayer?.push?.({ event: 'cta_click', label: 'start_decode' }); setOpen(true) },
    seeHow: () => { (window as any)?.dataLayer?.push?.({ event: 'cta_click', label: 'see_how' }); scrollTo('how') },
    talkCounselor: () => { (window as any)?.dataLayer?.push?.({ event: 'cta_click', label: 'talk_counselor' }); setOpen(true) },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-900 text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-none">Lifely ReGenflō™</div>
              <div className="text-xs text-neutral-600">Nature Never Fails</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a onClick={() => scrollTo('problem')} className="cursor-pointer text-sm text-neutral-700 hover:text-neutral-900">Why</a>
            <a onClick={() => scrollTo('how')} className="cursor-pointer text-sm text-neutral-700 hover:text-neutral-900">How it works</a>
            <a onClick={() => scrollTo('program')} className="cursor-pointer text-sm text-neutral-700 hover:text-neutral-900">What you get</a>
            <a onClick={() => scrollTo('blog')} className="cursor-pointer text-sm text-neutral-700 hover:text-neutral-900">Insights</a>
            <a onClick={() => scrollTo('faqs')} className="cursor-pointer text-sm text-neutral-700 hover:text-neutral-900">FAQs</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://calendly.com/mehul-lifely" target="_blank" rel="noreferrer" className="hidden rounded-xl border border-neutral-300 px-4 py-2 text-sm md:inline-flex">Book on Calendly</a>
            <button onClick={cta.talkCounselor} className="hidden rounded-xl border border-neutral-300 px-4 py-2 text-sm md:inline-flex">Talk to a Counselor</button>
            <button onClick={cta.startDecode} className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-neutral-800">
              Start Your Decode <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section id="hero" className="pt-10">
        <div className="mx-auto grid max-w-5xl gap-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto">
            <Badge>
              <ShieldCheck className="h-4 w-4" />
              <span>Precision Nutrient Intelligence • Microbiome → Gene → Cell</span>
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            You weren’t born to be maintained. You were engineered to operate.
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-3xl text-pretty text-lg text-neutral-700">
            Stop managing symptoms. Rebuild the system that heals them. ReGenflō™ restores your body’s original operating standard with terrain-specific nutrient matrices and daily defaults that make resilience automatic.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={cta.startDecode} className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-6 py-3 text-white shadow-sm transition hover:bg-neutral-800">
              Start Your Terrain Decode <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={cta.seeHow} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-6 py-3">
              See How It Works
            </button>
          </motion.div>
          <div className="mx-auto mt-2 text-xs text-neutral-600">Evidence-led. Human-centered. Built with clinicians, analysts, and real-world data.</div>
        </div>
      </Section>

      {/* Problem */}
      <Section id="problem" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The script we refuse to inherit</h2>
            <p className="text-neutral-700">Most "healthcare" optimizes for maintenance: suppress the signal, ship the fix, repeat. It scales and sells—but it doesn’t build humans.</p>
            <div className="grid gap-2">
              <div className="rounded-2xl bg-neutral-100 p-4">
                <div className="font-medium">The old script</div>
                <ul className="mt-2 list-disc pl-6 text-neutral-700">
                  <li>Health = absence of symptoms</li>
                  <li>Treatment = suppression</li>
                  <li>Strategy = short horizon</li>
                  <li>Result = dependence, fragility, recurring cycles</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <div className="font-medium">The human standard</div>
                <ul className="mt-2 list-disc pl-6 text-neutral-700">
                  <li>Health = capacity (energy, clarity, resilience)</li>
                  <li>Treatment = terrain repair</li>
                  <li>Strategy = long horizon</li>
                  <li>Result = sovereignty, strength, renewal</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid content-center gap-4">
            <div className="grid grid-cols-3 gap-4">
              <Stat label="Avg. time to usable energy" value="1–4 weeks" />
              <Stat label="Method pillars" value="3 steps" />
              <Stat label="Focus horizon" value="Decades" />
            </div>
            <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-600">
              Your body isn’t failing—it’s signaling. We rebuild the system so it stops crying out.
            </div>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">How ReGenflō™ works</h2>
          <p className="mt-2 text-neutral-700">A simple, operational standard that restores your biology to the way Nature designed it.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white">{f.icon}</div>
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-neutral-700">{f.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Pill>Signals over symptoms</Pill>
          <Pill>Terrain before tools</Pill>
          <Pill>Energy first</Pill>
          <Pill>Consistency &gt; intensity</Pill>
        </div>
      </Section>

      {/* What you get */}
      <Section id="program">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">What you get</h2>
          <p className="mt-2 text-neutral-700">A complete system—mapping, nutrient intelligence, and daily defaults—that you can actually keep when life is busy.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">ReGenflō™ Terrain DECODE</div>
            <p className="text-sm text-neutral-700">A precise map of your terrains (gut-immune, liver-methylation, mitochondria-hormone, neuro-autonomic) and the signals they generate.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">Precision Nutrient Intelligence</div>
            <p className="text-sm text-neutral-700">Targeted LifelyBiotic™ and LTNT matrices—fermented, bioactive complexes that feed repair loops rather than patch symptoms.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">Daily Defaults Architecture</div>
            <p className="text-sm text-neutral-700">Sleep-light-movement-breath-meal rhythms built to be kept when life gets busy. Defaults beat motivation.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">Counselor-Guided Implementation</div>
            <p className="text-sm text-neutral-700">Human guidance, data-driven adjustments, and accountability that respects your reality.</p>
          </div>
        </div>
      </Section>

      {/* Outcomes */}
      <Section id="outcomes">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight">What changes in the first month</h3>
            <ul className="grid gap-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5" /> Signals reframed—know what pain, fatigue, cravings, or brain fog are saying.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5" /> Targeted nutrient matrices begin feeding core terrains (microbiome → mitochondria → nervous system).</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5" /> Daily defaults make stability easier than chaos; motivation becomes optional.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5" /> Noticeable usable energy, steadier mood, deeper sleep, clearer focus.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-neutral-900 p-6 text-white shadow-sm">
            <div className="text-sm uppercase tracking-widest text-white/60">The contrast</div>
            <div className="mt-3 grid gap-3 text-sm">
              <div className="rounded-xl bg-white/10 p-3">Old: symptom quiet today → flare tomorrow</div>
              <div className="rounded-xl bg-white/10 p-3">New: terrain repair today → capacity tomorrow</div>
              <div className="rounded-xl bg-white/10 p-3">Old: dependence on experts</div>
              <div className="rounded-xl bg-white/10 p-3">New: shared sovereignty—your data leads; we refine</div>
              <div className="rounded-xl bg-white/10 p-3">Old: treat what hurts</div>
              <div className="rounded-xl bg-white/10 p-3">New: strengthen what heals</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Archetypes */}
      <Section id="archetypes">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Case-style illustrations</h2>
          <p className="mt-2 text-neutral-700">Representative outcomes when terrains stabilize. Individual results vary.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">High-stakes professional</div>
            <p className="text-sm text-neutral-700">Afternoon crashes → steady energy; shallow sleep → deeper recovery; irritability → calmer decisions.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">Women’s health terrain</div>
            <p className="text-sm text-neutral-700">Cycle irregularity & plateaus → smoother rhythm, better recovery, fewer spikes.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 font-semibold">Auto-immune terrain</div>
            <p className="text-sm text-neutral-700">Flares & food fear → clearer signals, stabilized routines, regained social life.</p>
          </div>
        </div>
      </Section>

      {/* BLOG */}
      <BlogModule />

      {/* FAQs */}
      <Section id="faqs">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">FAQs</h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-neutral-200 rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {FAQS.map((f, idx) => (
            <details key={idx} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                <span className="font-medium">{f.q}</span>
                <span className="text-neutral-500 transition group-open:rotate-90">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-neutral-700">{f.a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section id="final-cta" className="pb-24">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 text-center text-white shadow-xl">
          <div className="text-2xl font-semibold tracking-tight">Choose the standard, not the shortcut.</div>
          <p className="mt-2 text-white/80">When the body runs as designed, life does too.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-neutral-900">
              Start Your Terrain Decode <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-transparent px-6 py-3">
              Talk to a Counselor
            </button>
          </div>
          <div className="mt-3 text-xs text-white/70">No hype. No pressure. Clear plan. Real results.</div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/60 bg-white py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-sm text-neutral-600">Lifely ReGenflō™ — Nature Never Fails. Precision Nutrient Intelligence.</div>
          <div className="text-xs text-neutral-500">© {new Date().getFullYear()} Lifely. Education only; not a substitute for medical care.</div>
        </div>
      </footer>

      <LeadModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
