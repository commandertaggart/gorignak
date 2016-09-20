
console.info('starting webpack');

var Webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var compiler = new Webpack({
  context: path.join(__dirname, '..', 'client'),
  entry: {
    "index": [
      "./index.js"
    ]
  },
  output: {
    path: __dirname + '/../built/client/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' }
    ])
  ],
  devtool: 'source-map',
  node: {
    fs: 'empty',
    tls: 'empty'
  }
});

compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, function(err, stats) {});
