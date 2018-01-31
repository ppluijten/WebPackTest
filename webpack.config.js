const path = require("path");
const webpack = require("webpack");
const isDevelopment = process.env.NODE_ENV === "development";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const ExtractCssFile = new ExtractTextPlugin({ filename: "[name].[contenthash:8].css", disable: isDevelopment });
const CleanHtml = new CleanWebpackPlugin(["dist"]);
const BundleHtml = new HtmlWebpackPlugin({ template: "./src/index.html", filename: "../index.html" });
const VendorChunk = new webpack.optimize.CommonsChunkPlugin({ name: "vendor", minChunks: function(module) {
  return module.context && module.context.indexOf("node_modules") !== -1;
}});
const ManifestChunk = new webpack.optimize.CommonsChunkPlugin({ name: "runtime", minChunks: Infinity });

const ModuleIds = isDevelopment ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin();

module.exports = {
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractCssFile.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] })
      },
      {
        test: /\.less$/,
        use: ExtractCssFile.extract({ fallback: "style-loader", use: ["css-loader", "less-loader"] })
      },
      {
        test: /\.css$/,
        use: ExtractCssFile.extract({ fallback: "style-loader", use: "css-loader" })
      },
      {
        test: /\.png$/,
        use: [ { loader: "url-loader?limit=100000" } ]
      },
      {
        test: /\.jpg$/,
        use: [ { loader: "file-loader" } ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [ { loader: "url-loader?limit=10000&mimetype=application/font-woff" } ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [ { loader: "url-loader?limit=10000&mimetype=application/octet-stream" } ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [ { loader: "file-loader" } ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [ { loader: "url-loader?limit=10000&mimetype=image/svg+xml" } ]
      }
    ]
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [ ".ts", ".js", ".scss", ".css", ".less" ]
    // alias: {
    //   jquery: "jquery/src/jquery"
    // }
  },
  plugins: [
    ExtractCssFile,
    CleanHtml,
    BundleHtml,
    ModuleIds,
    VendorChunk,
    ManifestChunk
    // ,new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // })
    // ,new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production")
    //   }
    // })
  ],
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "dist")
  }
};