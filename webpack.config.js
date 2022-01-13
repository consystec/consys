const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env) {
  return {
    mode: 'production',
    output: {
      path: (env && env.dist) || path.join(__dirname, 'dist'),
      filename: 'index.js'
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "src/**/*",
            to: "[name][ext]",
          },
          {
            from: "css/*",
            to: "[name][ext]",
          },
          {
            from: "package.json",
            to: "[name][ext]",
          },
        ],
      }),
    ],
  }
}