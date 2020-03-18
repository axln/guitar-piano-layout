const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                        extensions: [".js", ".jsx"],
                        alias: {
                            //"react": "preact/compat",
                            //"react-dom": "preact/compat"
                        }
                    },
                    loader: "babel-loader",
                    options: {
                        sourceType: "unambiguous",
                        "presets": [
                            ["@babel/preset-env", {
                                "targets": {
                                    "browsers": ["last 2 versions"]
                                }
                            }]
                        ],
                        "plugins": [
                            ["@babel/plugin-transform-react-jsx", {
                                "pragma": "h",
                                "pragmaFrag": "Fragment",
                            }],
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
