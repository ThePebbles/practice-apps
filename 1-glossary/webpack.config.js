require("dotenv").config();

const path = require("path");

/*
  What should go here?  Great question!

  Before you go to documentation, verify which version of webpack
  you are using.

  Use this config to copy production versions of your
  index.html and styles.css to dist folder upon build
*/



module.exports = {
  mode: 'development',
  context: __dirname,
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};


// module.exports = [
//   {
//     output: {
//       filename: './client/dist',
//       //libraryTarget: 'index'
//     },
//     name: 'index',
//     entry: './client/src/index.html',
//     mode: 'production',
//   },
//   {
//     output: {
//       filename: './client/dist',
//       //libraryTarget: 'css'
//     },
//     name: 'css',
//     entry: './client/src/styles.css',
//     mode: 'production',
//   },
// ];

//module.exports = {};
