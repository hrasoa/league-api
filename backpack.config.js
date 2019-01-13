module.exports = {
  webpack: config => {
    // Perform customizations to config
    // Important: return the modified config
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
};
