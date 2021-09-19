const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.tsx',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devtool: argv.mode === 'development' ? 'cheap-module-source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]]
              }
            },
            'ts-loader'
          ]
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
