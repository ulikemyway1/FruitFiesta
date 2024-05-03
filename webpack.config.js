const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const baseConfig = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Fruit Fiesta"
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicon/icon.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'Fruit Fiesta',
        appDescription: 'e-Commerce Fruit Fiesta',
        developerName: 'Success Coders Team',
        developerURL: 'https://github.com/ulikemyway1/FruitFiesta',
        background: '#fff',
        theme_color: '#fff',
      }
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
