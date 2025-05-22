module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
            options: {
              throwIfNamespace: false
            }
          }
        ]
      }
    }
  }
}; 