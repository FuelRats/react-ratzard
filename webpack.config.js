const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HTMLWebpackPlugin({
  template: path.resolve('examples', 'src', 'index.html'),
  filename: './index.html'
})

module.exports = {
  entry: path.resolve('examples', 'src' , 'index.js'),
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3001,
  },
}
