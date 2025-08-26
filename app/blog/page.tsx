import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

type Frontmatter = {
  title: string
  date: string
  author?: string
  description?: string
  tags?: string[]
}

function resolvePostsDir() {
  const roots = [
    process.cwd(),
    path.join(process.cwd(), "regenflo-landing"),
    path.join(process.cwd(), "..", "regenflo-landing"),
    path.join(process.cwd(), ".."),
  ]
  for (const root of roots) {
    const dir = path.join(root, "content", "blog")
    if (fs.existsSync(dir)) return dir
  }
  // fallback to current project guess
  return path.join(process.cwd(), "content", "blog")
}

export default function BlogPage() {
  const postsDir = resolvePostsDir()
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : []

  const posts = files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8")
      const { data } = matter(raw)
      const fm = data as Frontmatter
      return { slug, ...fm }
    })
    .sort((a, b) => (+new Date(b.date) as any) - (+new Date(a.date) as any))

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">ReGenflō Blog</h1>
      <p className="mt-2 text-neutral-600">
        Deep dives, practical guides, and the science behind terrain repair.
      </p>

      <div className="mt-8 space-y-6">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">
              <Link className="hover:underline" href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>
            <div className="mt-1 text-sm text-neutral-500">
              {new Date(p.date).toLocaleDateString()} {p.author ? `· ${p.author}` : ""}
            </div>
            {p.description && <p className="mt-2 text-neutral-700">{p.description}</p>}
            {Array.isArray(p.tags) && p.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{t}</span>
                ))}
              </div>
            )}
          </article>
        ))}

        {posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center text-neutral-600">
            No posts yet. Add a <code>.mdx</code> file in <code>content/blog</code>.
          </div>
        )}
      </div>
    </main>
  )
}
