/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
