const path = require("path");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
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
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, "dist"),
        src: "index.html",
        dest: "index.html",
        inline: true,
        minify: true,
        extract: true,
        width: 1440,
        height: 600,
        penthouse: {
          blockJSRequests: false
        }
      }),
      new PreloadWebpackPlugin({
        rel: "preload",
        include: "allAssets",
        as(entry) {
          if (/\.css$/.test(entry)) return "style";
          if (/\.(woff2)$/.test(entry)) return "font";
          // if (/\.(jpg|png|gif|svg)$/.test(entry)) return "image";
          return "script";
        },
        fileBlacklist: [
          /\.js/,
          /\.(eot|otf|ttf|woff)$/,
          /\.(jpg|png|gif|svg)$/,
          /__offline_serviceworker/
        ]
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
