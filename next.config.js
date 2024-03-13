/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    (config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: "handlebars/dist/handlebars.js",
    }),
      (config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        canvas: false,
        encoding: false,
      });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: "https",
        hostname: "aceternity.com",
      },
    ],
  },
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cacheHandler.js")
      : undefined,
  cacheMaxMemorySize: process.env.NODE_ENV === "production" ? 0 : undefined,
  experimental: {
    optimisticClientCache: false,
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
  },
  env: {
    NEXT_PUBLIC_ROOT_DOMAIN:
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? "localhost"
        : "localhost",
    AUTH_TOKEN: process.env.AUTH_TOKEN,
  },
  generateBuildId: async () => {
    return process.env.GIT_HASH;
  },
};

module.exports = nextConfig;
