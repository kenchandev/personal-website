const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
      filename: "[name]-[hash].min.js"
    },
    mode: "production",
    plugins: [
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
