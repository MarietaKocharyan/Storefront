import type { NextConfig } from "next";

const nextConfig = {
    images: {
        domains: ['fakestoreapi.com'],
    },
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
