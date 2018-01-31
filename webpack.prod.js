const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const UglifyJS = new UglifyJSPlugin();

const ProductionMode = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
});

// const ProductionMode = new webpack.DefinePlugin({
//   "process.env": {
//     NODE_ENV: JSON.stringify("production")
//   }
// });

const ProductionModuleIds = new webpack.HashedModuleIdsPlugin();

const ExtractCssFile = new ExtractTextPlugin({ filename: "[name].[contenthash:8].css" });

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractCssFile.extract({ use: ["css-loader", "sass-loader"] })
      },
      {
        test: /\.less$/,
        use: ExtractCssFile.extract({ use: ["css-loader", "less-loader"] })
      },
      {
        test: /\.css$/,
        use: ExtractCssFile.extract({ use: "css-loader" })
      }
    ]
  },
  plugins: [
    ExtractCssFile,
    ProductionModuleIds,
    UglifyJS,
    ProductionMode
  ]
});