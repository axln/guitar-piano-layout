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
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            //"@babel/preset-react",
                            ["@babel/preset-env", {
                                "targets": {
                                    "browsers": ["last 2 versions"]
                                }
                            }]
                        ],
                        "plugins": [
                            ["@babel/plugin-transform-react-jsx"],
                            ["@babel/plugin-proposal-class-properties"],
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
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
