const webpackMerge = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common.config");
const isProd = process.env.NODE_ENV === "production";
const envConfig = isProd
  ? require("./webpack.prod.config")
  : require("./webpack.dev.config");

module.exports = webpackMerge(webpackCommonConfig(isProd), envConfig());
