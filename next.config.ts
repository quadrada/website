import type { NextConfig } from "next";

import { siteConfig } from "./src/config/site";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // Old links and test QR codes on the Vercel address land on our own domain (docs/decisions/0007).
      {
        source: "/:path*",
        has: [{ type: "host", value: "quadrada.vercel.app" }],
        destination: `${siteConfig.url}/:path*`,
        permanent: false,
      },
      // Printed QR codes point at /qr: change `destination` to retarget them (docs/decisions/0006).
      // Must stay temporary (307): browsers cache permanent redirects and would ignore changes.
      { source: "/qr", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
