const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static-cdn.jtvnw.net", "clips-media-assets2.twitch.tv"],
  },
};

// module.exports = withAxiom(nextConfig);
module.exports = nextConfig;
