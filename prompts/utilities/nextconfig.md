```markdown:prompts/utilities/nextconfig.md
# Next.js Configuration Instructions

## Overview
This document outlines the standard settings for configuring a Next.js project. Follow these instructions to ensure your Next.js application is set up correctly.

## Configuration File
Create or update the `next.config.js` file in the root of your project with the following settings:

```javascript:next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode for highlighting potential problems
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // Allows images from Google User Content
      },
    ],
    domains: [
      'cdn.simplehash.com', 
      'gateway.ipfscdn.io', 
      'media.artblocks.io', 
      '**.thirdwebcdn.com', 
      '**.seadn.io', 
      'lh3.googleusercontent.com', 
      'i.seadn.io', 
      'openseauserdata.com', 
      'rarible.mypinata.cloud', 
      'media-proxy.artblocks.io', 
      'raw.seadn.io', 
      'img.reservoir.tools', 
      'blur.io', 
      '0b6ff6d257685c2de8cc8e51755a0ae9.ipfscdn.io'
    ], // List of allowed image domains
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'], // Enables SVG imports as React components
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/profile/:address/offers',
        destination: '/profile/:address/offers/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/collected',
        destination: '/profile/:address/collected/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/bids',
        destination: '/profile/:address/bids/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/asks',
        destination: '/profile/:address/asks/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/activity',
        destination: '/profile/:address/activity/ethereum',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

## Explanation
- **React Strict Mode**: Enabled to help identify potential problems in the application.
- **Image Configuration**: Specifies allowed remote patterns and domains for image optimization.
- **Webpack Configuration**: Adds a rule to handle SVG files using `@svgr/webpack`.
- **Redirects**: Defines permanent redirects for specific profile routes to include the `/ethereum` suffix.

Ensure to follow these settings to maintain consistency across projects.
```