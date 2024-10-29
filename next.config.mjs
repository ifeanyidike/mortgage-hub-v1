/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.malink.ca",
      },
      {
        protocol: "https",
        hostname: "www.mortgagearchitects.ca",
      },
    ],
  },
};

export default nextConfig;
