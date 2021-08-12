const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env) {
  return {
    mode: 'production',
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "src/**/*",
            to: "[name][ext]",
          },
        ],
      }),
    ],
  }
}