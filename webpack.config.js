const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: './src/index.jsx',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        devtool: argv.mode === 'development'
            ? 'cheap-module-source-map'
            : false,
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
                            ['@babel/plugin-transform-react-jsx', {
                                'pragma': 'h',
                                'pragmaFrag': 'Fragment',
                            }],
                            ['@babel/plugin-proposal-class-properties']
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
            contentBase: path.join(__dirname, 'build'),
            compress: true,
            port: 8080
        }
    }
};
