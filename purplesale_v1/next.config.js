/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/launchpads/create",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "raw.githubusercontent.com",
      "img.freepik.com",
      "images.pexels.com",
      "i.dummyjson.com",
      "upload.wikimedia.org",
      "cloudfront-us-east-1.images.arcpublishing.com",
      "w7.pngwing.com",
      "upload.wikimedia.org",
      "cdn-icons-png.flaticon.com",
      "upload.wikimedia.org",
      "example.com",
      "cdn-icons-png.flaticon.com",
      "altcoinsbox.com",
      "photos.pinksale.finance",
      "res.cloudinary.com",
      "purplesale-ui.vercel.app",
      "flashfreelancetoken.com",
      "media.cylex.us.com",
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
