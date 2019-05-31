"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

const HOST = "localhost";
const PORT = 8080;

module.exports = merge(baseConfig, {
  mode: "development",

  devServer: {
    clientLogLevel: "warning",
    hot: true,
    contentBase: "dist",
    compress: true,
    host: HOST,
    port: PORT,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: "/",
    quiet: true,
    disableHostCheck: true,
    watchOptions: {
      poll: true
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // you can also read from a file, e.g. `variables.scss`
              // data: `$color: red;`
            }
          }
        ]
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
});
