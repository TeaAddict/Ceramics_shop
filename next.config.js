/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // Optional configuration options (see below)
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "standalone", // reduces serverless function size
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
