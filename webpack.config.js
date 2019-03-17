const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
          },
        },
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: [`style-loader`, `css-loader`],
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true,
  },
};
