const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const DevelopmentMode = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("development")
});

const DevelopmentModuleIds = new webpack.NamedModulesPlugin();

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
      },
      {
        test: /\.less$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "less-loader" }]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  devtool: "eval-source-map",
  plugins: [
    DevelopmentMode,
    DevelopmentModuleIds
  ]
});