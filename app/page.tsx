// app/blog/page.tsx
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getAllPosts } from "@/content/blog/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">ReGenflō Blog</h1>
      <p className="mt-2 text-neutral-600">
        Deep dives, practical guides, and the science behind terrain repair.
      </p>

      <div className="mt-8 space-y-6">
        {posts.map(({ slug, meta }) => (
          <article key={slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">
              <Link className="hover:underline" href={`/blog/${slug}`}>{meta.title}</Link>
            </h2>
            <div className="mt-1 text-sm text-neutral-500">
              {new Date(meta.date).toLocaleDateString()} {meta.author ? `· ${meta.author}` : ""}
            </div>
            {meta.description && <p className="mt-2 text-neutral-700">{meta.description}</p>}
            {Array.isArray(meta.tags) && meta.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {meta.tags.map((t) => (
                  <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{t}</span>
                ))}
              </div>
            )}
          </article>
        ))}

        {posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center text-neutral-600">
            No posts yet. Add an <code>.mdx</code> file in <code>content/blog</code> and register it in <code>content/blog/posts.ts</code>.
          </div>
        )}
      </div>
    </main>
  );
}
