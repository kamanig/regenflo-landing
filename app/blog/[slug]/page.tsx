// app/blog/[slug]/page.tsx
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "../../../content/blog/posts";

export async function generateStaticParams() {
  // Tell Next/Vercel which slugs exist at build time
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: { slug: string } };

export default function BlogPostPage({ params }: Props) {
  const entry = getPostBySlug(params.slug);

  if (!entry) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-6">
          <Link href="/blog" className="underline">← Back to blog</Link>
        </p>
      </main>
    );
  }

  const { Component, meta } = entry;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{meta.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {new Date(meta.date).toLocaleDateString()}
        {meta.author ? ` · ${meta.author}` : ""}
      </p>
      {meta.description && (
        <p className="mt-3 text-neutral-700">{meta.description}</p>
      )}

      <article className="prose prose-neutral mt-8 max-w-none">
        <Component /> {/* ← render MDX directly */}
      </article>

      <div className="mt-10">
        <Link href="/blog" className="text-sm font-medium hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </main>
  );
}
