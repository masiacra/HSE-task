const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopmentMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.ts",
  mode: isDevelopmentMode ? "development" : "production",
  devtool: isDevelopmentMode ? "source-map" : "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Traffic lights app",
      template: "./index.html",
    }),
  ],
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
};
