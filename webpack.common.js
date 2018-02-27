const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const CleanHtml = new CleanWebpackPlugin(["dist"]);
const BundleHtml = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "../index.html",
  inject: "head"
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
const GlobalLibraries = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
});

module.exports = {
  entry: "./src/app.ts",
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader"
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: "ts-loader",
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
      options: {
        presets: ["env"]
      }
    },
    {
      test: /\.png$/,
      loader: "url-loader",
      options: {
        limit: 100000
      }
    },
    {
      test: /\.gif$/,
      loader: "url-loader",
      options: {
        limit: 10000
      }
    },
    {
      test: /\.jpg$/,
      loader: "file-loader"
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "application/font-woff"
      }
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "application/octet-stream"
      }
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "image/svg+xml"
      }
    }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".scss", ".css", ".less"],
    alias: {
      jquery: "jquery/src/jquery",
      vue: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    CleanHtml,
    BundleHtml,
    VendorChunk,
    ManifestChunk,
    GlobalLibraries
  ],
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  }
};