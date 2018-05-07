const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const clientConfig = {
  entry: [
    './src/client/index.js',
    './node_modules/todomvc-common/base.css',
    './node_modules/todomvc-app-css/index.css'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './public/css/app.css'
    }),
    new webpack.BannerPlugin({
      banner: '__isBrowser__ = true;',
      raw: true,
      include: /\.js$/
    })
  ]
};

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals'
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '__isBrowser__ = false;',
      raw: true,
      include: /\.js$/
    })
  ]
};

module.exports = [clientConfig, serverConfig];
