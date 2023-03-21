const UnoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false
    config.plugins.push(
      UnoCSS({
        rules: [
          [/^bg-(\S+)$/, ([, str]) => ({ 'background-color': `${str}` })],
        ]
      }),
    )
    return config
  },
}

module.exports = nextConfig
