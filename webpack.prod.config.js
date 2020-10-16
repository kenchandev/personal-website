const path = require("path");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = () => {
  return {
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: false,
          parallel: true,
          uglifyOptions: {
            output: {}
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name]-[hash].min.js",
      crossOriginLoading: "anonymous"
    },
    mode: "production",
    plugins: [
      new PreloadWebpackPlugin({
        rel: "preload",
        include: "allAssets",
        as(entry) {
          if (/\.(woff2)$/.test(entry)) return "font";

          return "script";
        },
        fileBlacklist: [
          /\.css/,
          /\.js/,
          /\.(eot|otf|ttf|woff)$/,
          /\.(jpg|png|gif|svg)$/,
          /__offline_serviceworker/
        ]
      }),
      new SriPlugin({
        hashFuncNames: ["sha256", "sha384"]
      }),
      new CopyPlugin([
        {
          from: "@(CNAME|robots.txt|sitemap.xml)",
          to: "[name].[ext]",
          toType: "template"
        }
      ])
    ]
  };
};
