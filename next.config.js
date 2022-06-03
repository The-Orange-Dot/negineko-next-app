/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  frame-ancestors 'self';
  frame-ancestors 'https://player.twitch.tv' 'https://twitch.tv' 'https://usher.ttvnw.net' 'https://negineko.netlify.app' 'https://neginekoapp.herokuapp.com/' 'https://main.dip55vc1mjxsy.amplifyapp.com/' 'https://neginekotokyo.com' ; 
`;

const nextConfig = {
  images: {
    domains: [
      "stripe-camo.global.ssl.fastly.net",
      "d1wqzb5bdbcre6.cloudfront.net",
      "static-cdn.jtvnw.net",
      "res.cloudinary.com",
    ],
  },
  future: { webpack5: false },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },

  target: "experimental-serverless-trace",
  webpack: (config, { defaultLoaders, isServer }) => {
    if (isServer) {
      config.externals.push("_http_common");
    }

    return config;
  },
};

module.exports = nextConfig;
