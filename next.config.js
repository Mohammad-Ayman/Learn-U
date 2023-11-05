/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
// next.config.js
module.exports = {
  images: {
    domains: [
      "images.unsplash.com",
      "assets.api.uizard.io",
      "www.nyip.edu",
      "plus.unsplash.com",
      "media.istockphoto.com",
    ],
  },
  head: {
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      // You can add more icon sizes if needed
    ],
  },
};
