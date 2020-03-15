const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    //console.log('env:', env, argv);

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
                    exclude: /node_modules/,
                    resolve: {
                        extensions: [".js", ".jsx"]
                    },
                    use: ["babel-loader"]
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.less$/,
                    use: ["style-loader", "css-loader", "less-loader"]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({template: "./src/index.html"})
        ],
        devServer: {
            compress: true,
            //host: '0.0.0.0',
            port: 8080
        }
    }
};
