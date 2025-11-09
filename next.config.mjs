/** @type {import('next').NextConfig} */
const allowedDevOrigins = [];

if (process.env.NEXT_ALLOWED_DEV_ORIGINS) {
  allowedDevOrigins.push(...process.env.NEXT_ALLOWED_DEV_ORIGINS.split(',').map(s => s.trim()).filter(Boolean));
}

// Common preview domains used by Builder/preview environments
allowedDevOrigins.push('https://25bcdd03f32a4e2a8d98c81f6ad235f0-9fe1c5d5e3c742be9affbc156.fly.dev');
allowedDevOrigins.push('https://*.projects.builder.codes');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    // allow cross-origin dev origins for RSC in dev
    allowedDevOrigins,
  },
};

export default nextConfig;
