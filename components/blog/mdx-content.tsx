import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["no-underline"] } }],
  [
    rehypePrettyCode,
    {
      theme: { dark: "github-dark", light: "github-light" },
      keepBackground: false,
    },
  ],
];

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-img:rounded-xl">
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins, rehypePlugins } }} />
    </div>
  );
}
