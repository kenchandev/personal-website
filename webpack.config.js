const webpackMerge = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common.config");
const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";
const isDev = NODE_ENV === "development";
const envConfig = isProd
  ? require("./webpack.prod.config")
  : require("./webpack.dev.config");

module.exports = webpackMerge(webpackCommonConfig(isProd, isDev), envConfig());
