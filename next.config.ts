import type { NextConfig } from 'next';
import fs from 'fs';
import path from 'path';

// Check if CV exists at build time and warn if missing
const cvPath = path.join(process.cwd(), 'public/cv/Aymane_El_Khadraoui_CV_EN.pdf');
if (!fs.existsSync(cvPath)) {
  console.warn('\n⚠️  [ASSET WARNING]: public/cv/Aymane_El_Khadraoui_CV_EN.pdf was not found.');
  console.warn(
    '   The portfolio will render the link to this CV, but ensure the file is placed at public/cv/Aymane_El_Khadraoui_CV_EN.pdf before distribution.\n',
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
