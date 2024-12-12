/** @type {import('next').NextConfig} */

// next.config.mjs

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

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
      {
        protocol: "https",
        hostname: "mortgagehub-bucket.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
};

export default withAutoCert(nextConfig);
