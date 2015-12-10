var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

// bundle dependencies in separate vendor bundle
var vendorPackages = Object.keys(pkg.dependencies).filter(function (el) {
  return el.indexOf('font') === -1; // exclude font packages from vendor bundle
});
var outputFileTemplateSuffix = '-' + pkg.version;

module.exports = {
  devtool: 'eval',
  entry: {
    main: './app/index',
    vendor: vendorPackages
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]' + outputFileTemplateSuffix + '.js',
    chunkFilename: '[id]' + outputFileTemplateSuffix + '.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL || 'http://localhost:51407')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor' + outputFileTemplateSuffix + '.js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};
