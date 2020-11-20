'use strict'
module.exports = {
  entry: './app/main', 
  mode: 'development',
  output: {
    path: __dirname, 
    filename: 'bundle.js'
  },
  devtool: 'inline-source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}





