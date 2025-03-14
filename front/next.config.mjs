/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000'
            },
            {
                protocol: 'https',
                hostname: 'api.gabrielmullerdev.com.br'
            }
        ]
    }
};

export default nextConfig;
