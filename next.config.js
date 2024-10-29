/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      canvas: false,
      encoding: false,
    };
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
  // cacheHandler:
  //   process.env.NODE_ENV === "production"
  //     ? require.resolve("./cacheHandler.js")
  //     : undefined,
  // cacheMaxMemorySize: process.env.NODE_ENV === "production" ? 0 : undefined,
  // deploymentId:
  //   process.env.NODE_ENV === "production"
  //     ? process.env.DEPLOYMENT_ID
  //     : undefined,
  env: {
    NEXT_PUBLIC_ROOT_DOMAIN:
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? process.env.NEXT_PUBLIC_ROOT_DOMAIN
        : "localhost",
    AUTH_TOKEN: process.env.AUTH_TOKEN,
  },
  // generateBuildId: async () => {
  //   return process.env.GIT_HASH;
  // },
  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: "/home/features/:path*",
  //         destination: `${process.env.DOCS_URL}/:path*`,
  //       },
  //     ],
  //   };
  // },
};

module.exports = nextConfig;
