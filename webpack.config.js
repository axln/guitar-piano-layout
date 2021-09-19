const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.jsx',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devtool: argv.mode === 'development' ? 'cheap-module-source-map' : false,
    resolve: {
      /*alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
      }*/
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          resolve: {
            extensions: ['.js', '.jsx']
          },
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  runtime: 'automatic'
                  /*pragma: 'h',
                  pragmaFrag: 'Fragment'*/
                }
              ],
              ['@babel/plugin-proposal-class-properties'],
              [
                'babel-plugin-root-import',
                {
                  rootPathPrefix: '~',
                  rootPathSuffix: 'src'
                }
              ]
            ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'head'
      })
    ],
    devServer: {
      compress: true,
      port: 8080
    }
  };
};
