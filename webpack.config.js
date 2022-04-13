const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env) {
  return {
    mode: 'production',
    entry: {
      path: './src/file.js'
    },
    output: {
      path: (env && env.dist) || path.join(__dirname, 'dist'),
      filename: 'file.js'
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