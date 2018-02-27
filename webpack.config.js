"use strict";

console.log(`Building webpack using ${process.env.NODE_ENV} configuration`);

const setup = process.env.NODE_ENV === "production"
  ? require("./webpack.prod.js")
  : require("./webpack.dev.js");

module.exports = setup;