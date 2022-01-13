const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env) {
  return {
    mode: 'production',
    output: {
      path: (env && env.dist) || path.join(__dirname, 'dist'),
      filename: 'index.js',
      clean: true
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "src/**/*",
            to: "[name][ext]",
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ["**/App.*, **/Components.*, **/index.*"],
            },
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