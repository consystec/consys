const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: 'chunk[name].js',
    publicPath: '/',
    clean: true
  },
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx|js?$/,
        exclude: /node_modules\/(?!consys$)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                ["import", { libraryName: "antd", style: true }]
              ],
              compact: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            },
          }
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              modifyVars: {
                "primary-color": "#00adb8",
                "font-size-base": "13px"
              },
              javascriptEnabled: true
            },
          }
        }]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/, // Traduz imagens
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
    
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },

    host: 'local-ipv4',
    open: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      minify: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/**/*",
          to: "../node_modules/consys/[name][ext]",
        },
        {
          from: "css/*",
          to: "../node_modules/consys/[name][ext]",
        },
        {
          from: "package.json",
          to: "../node_modules/consys/[name][ext]",
        },
      ],
    }),
  ]
}