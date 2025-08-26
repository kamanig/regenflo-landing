// mdx-components.tsx  (NO "use client")
import type { MDXComponents } from 'mdx/types'

/**
 * This runs on the server in App Router.
 * Return any component mappings you want to use inside MDX.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Example mappings (optional):
    // h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
    // a: (props) => <a className="underline" {...props} />,
  }
}
