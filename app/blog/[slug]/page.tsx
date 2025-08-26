import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

function tryResolvePostPath(slug: string) {
  // Try several likely roots (handles odd workspace roots on Windows)
  const roots = [
    process.cwd(),
    path.join(process.cwd(), "regenflo-landing"),
    path.join(process.cwd(), "..", "regenflo-landing"),
    path.join(process.cwd(), ".."),
  ]

  const candidates = roots.map((root) =>
    path.join(root, "content", "blog", `${slug}.mdx`)
  )

  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  // If none found, return the first candidate (for diagnostics)
  return candidates[0]
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = tryResolvePostPath(params.slug)
  const exists = fs.existsSync(filePath)

  if (!exists) {
    // Helpful dev hint on where we looked
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-2 text-neutral-600">
          I tried to load: <code className="break-all">{filePath}</code>
        </p>
        <p className="mt-2">
          Make sure a file exists at <code>content/blog/{params.slug}.mdx</code>.
        </p>
        <p className="mt-6">
          Back to the{" "}
          <a className="underline" href="/blog">
            blog
          </a>
          .
        </p>
      </main>
    )
  }

  const raw = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(raw) as any

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {new Date(data.date).toLocaleDateString()} {data.author ? `· ${data.author}` : ""}
      </p>
      <article className="prose prose-neutral mt-8 max-w-none">
        <MDXRemote source={content} />
      </article>
      <div className="mt-10">
        <a href="/blog" className="text-sm font-medium text-neutral-900 hover:underline">
          ← Back to all articles
        </a>
      </div>
    </main>
  )
}
