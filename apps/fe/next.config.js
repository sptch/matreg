// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  generateBuildId: () => 'build',
  // experimental: {
  //   reactRoot: true
  // },
  webpack: (config, options) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      module: false,
    };
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      // { test: /\.txt$/, use: "raw-loader" },
      { test: /\.png$/, use: ['file-loader', 'url-loader'] }
    );
    return config;
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    disableStaticImages: true,
  },
};

module.exports = withNx(nextConfig);
