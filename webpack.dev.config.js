const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8889;

module.exports = () => {
  return {
    devtool: "cheap-eval-source-map",
    devServer: {
      port: PORT,
      host: HOST,
      compress: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      historyApiFallback: true
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name]-[hash].min.js"
    },
    mode: "development",
    plugins: [
      new CopyPlugin([
        {
          from: "@(CNAME.dev)",
          to: "[name]",
          toType: "template"
        }
      ])
    ]
  };
};
