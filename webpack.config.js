module.exports = {
  target: "webworker",
  entry: "./src/index.js",
  mode: "production",
  optimization: {
    minimize: true
  },
  performance: {
    hints: false
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "worker.js"
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
