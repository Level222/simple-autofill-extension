const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    "content-script": "./src/content-script/index.ts",
    "options-ui": "./src/options-ui/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.(css|scss)$/,
        oneOf: [
          {
            assert: { type: "css" },
            use: [
              {
                loader: "css-loader",
                options: {
                  exportType: "string"
                }
              },
              "sass-loader"
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json"
        },
        {
          from: "./src/icons",
          to: "icons"
        }
      ]
    }),
    new HTMLWebpackPlugin({
      template: "./src/options-ui/index.html",
      filename: "options-ui.html",
      chunks: ["options-ui"]
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", "..."]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  ...(isProduction ? {} : { devtool: "inline-cheap-module-source-map" })
};
