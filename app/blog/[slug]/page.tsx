// Make sure this route runs on Node (so fs is available) and stays dynamic.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

/** Find the folder that contains your MDX posts, even on Vercel */
function resolvePostsDir() {
  const roots = [
    process.cwd(),
    path.join(process.cwd(), "regenflo-landing"),
    path.join(process.cwd(), "..", "regenflo-landing"),
    path.join(process.cwd(), ".."),
  ];
  for (const root of roots) {
    const dir = path.join(root, "content", "blog");
    if (fs.existsSync(dir)) return dir;
  }
  // last resort
  return path.join(process.cwd(), "content", "blog");
}

/** ✅ This tells Next/Vercel the list of slugs to pre-build */
export async function generateStaticParams() {
  const dir = resolvePostsDir();
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const dir = resolvePostsDir();
  const filePath = path.join(dir, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-2 text-neutral-600">
          I tried to load: <code className="break-all">{filePath}</code>
        </p>
        <p className="mt-6">
          <a className="underline" href="/blog">← Back to blog</a>
        </p>
      </main>
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw) as any;

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
        <a href="/blog" className="text-sm font-medium hover:underline">← Back to all articles</a>
      </div>
    </main>
  );
}
