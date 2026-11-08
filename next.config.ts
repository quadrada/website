import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // Printed QR codes point at /qr: change `destination` to retarget them (docs/decisions/0006).
      // Must stay temporary (307): browsers cache permanent redirects and would ignore changes.
      { source: "/qr", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
