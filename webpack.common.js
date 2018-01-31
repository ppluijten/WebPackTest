const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const CleanHtml = new CleanWebpackPlugin(["dist"]);
const BundleHtml = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "../index.html"
});
const VendorChunk = new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: function (module) {
    return module.context && module.context.indexOf("node_modules") !== -1;
  }
});
const ManifestChunk = new webpack.optimize.CommonsChunkPlugin({
  name: "runtime",
  minChunks: Infinity
});

module.exports = {
  entry: "./src/app.ts",
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/
    },
    {
      test: /\.png$/,
      use: [{
        loader: "url-loader?limit=100000"
      }]
    },
    {
      test: /\.jpg$/,
      use: [{
        loader: "file-loader"
      }]
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }]
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      }]
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: "file-loader"
      }]
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }]
    }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".scss", ".css", ".less"]
    // alias: {
    //   jquery: "jquery/src/jquery"
    // }
  },
  plugins: [
    CleanHtml,
    BundleHtml,
    VendorChunk,
    ManifestChunk
    // ,new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // })
  ],
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "dist")
  }
};