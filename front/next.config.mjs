/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                domain: 'localhost',
                port: 8000
            },
            {
                protocol: 'https',
                domain: 'api.gabrielmullerdev.com.br'
            }
        ]
    }
};

export default nextConfig;
