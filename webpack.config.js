/*eslint-env node*/
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = function(env) {
  return {
    mode: 'production',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      path: (env && env.dist) || path.join(__dirname, 'dist'),
      filename: 'index.js',
    },
    plugins: [
      new CopyWebpackPlugin([
        { 
          flatten: true,
          from: 'src/**/*.jsx'
        },
        { 
          flatten: true,
          from: 'src/**/*.js'
        },
        { 
          flatten: true,
          from: 'package.json'
        },
        { 
          flatten: true,
          from: 'src/**/*.css'
        },
        { 
          flatten: true,
          from: 'css/**/*.css'
        },
        { 
          flatten: true,
          from: 'package.json'
        }
      ])
    ],
  }
}