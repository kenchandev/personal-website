const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

module.exports = {
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-strict-mode",
    ["@babel/plugin-transform-runtime", { regenerator: true }]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        modules: isTest ? "commonjs" : false,
        targets: {
          browsers: ["defaults"]
        },
        debug: isProd,
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ]
};
