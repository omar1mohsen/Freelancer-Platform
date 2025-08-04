/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const withNextIntl = createNextIntlPlugin();
// Use ES Module-compatible alternatives for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  images: {
    domains: [
      'multi-vendors-989.saied.aait-d.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "multi-vendors-989.saied.aait-d.com",
        pathname: "/storage/**", 
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

export default withNextIntl(nextConfig);
