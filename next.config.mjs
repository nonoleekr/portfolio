const isGithubActions = process.env.GITHUB_ACTIONS === "true";

// Repo name is used as the basePath so the static export works at
// https://<user>.github.io/<repo>/ — set NEXT_PUBLIC_BASE_PATH to "" if
// you deploy to a custom domain or a <user>.github.io root repo instead.
const repoName = "portfolio";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
