const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // hubungkan plugin

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// chubungkan plugin mini-css-extract-plugin ke proyek
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
    clean: true,
  },
  target: ['web', 'es5'],
  stats: { children: true },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {importLoaders: 1}
          },
          "postcss-loader"
        ]
      },
      {
        // tambahkan kaidah untuk memproses file
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource"
      },
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html" // jalur file ke index
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ] 
};