const path = require("path");
const webpack = require("webpack");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require("offline-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = isProd => {
  return {
    entry: {
      "assets/scripts/app": path.resolve(
        __dirname,
        "assets",
        "scripts",
        "app.js"
      ),
      "assets/styles/app": path.resolve(
        __dirname,
        "assets",
        "styles",
        "app.scss"
      )
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ["svg-icon-inline-loader", "pug-loader"]
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: ["babel-loader"]
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[path][name]-[hash].[ext]"
            }
          }
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              publicPath: "/",
              name: "[path][name]-[hash].[ext]"
            }
          }
        }
      ]
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(), //  https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/518
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.pug"),
        isProd,
        sesEndpoint: `${
          isProd
            ? "https://c4g6e6lp97.execute-api.us-east-1.amazonaws.com/production"
            : "http://localhost:3000"
        }/site-mailer`
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer"
      }),
      new webpack.DefinePlugin({
        IS_PROD: isProd
      }),
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].min.css"
      }),
      new WebpackPwaManifest({
        name: "Ken Chan",
        short_name: "Ken Chan",
        theme_color: "#252832",
        background_color: "#252832",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { size: "36", density: "0.75" },
          { size: "48", density: "1.0" },
          { size: "72", density: "1.5" },
          { size: "96", density: "2.0" },
          { size: "144", density: "3.0" },
          { size: "192", density: "4.0" },
          { size: "256" },
          { size: "512" }
        ].map(({ size, density }) => {
          return {
            src: path.resolve(
              `assets/favicons/android-chrome-${size}x${size}.png`
            ),
            size,
            density
          };
        })
      }),
      new OfflinePlugin()
    ]
  };
};
