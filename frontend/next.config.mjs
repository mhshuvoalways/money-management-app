/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;
