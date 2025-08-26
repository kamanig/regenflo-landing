import FirstPost, { meta as firstPostMeta } from "./first-post.mdx";

export type PostEntry = {
  slug: string;
  meta: {
    title: string;
    date: string;
    author?: string;
    description?: string;
    tags?: string[];
  };
  Component: React.ComponentType<any>;
};

export const posts: PostEntry[] = [
  { slug: firstPostMeta.slug, meta: firstPostMeta, Component: FirstPost },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));
}
export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
export function getAllSlugs() {
  return posts.map((p) => p.slug);
}
