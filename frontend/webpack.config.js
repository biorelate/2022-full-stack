const path = require("path");

const HtmlPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const webpack = require("webpack");


module.exports = {
    entry: ["./src/app.jsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[fullhash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: ["/index.jsx", "/index.js", ".jsx", ".js"],
        fallback: {
            "buffer": require.resolve("buffer"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true
    },
    devServer: {
        host: "localhost",
        historyApiFallback: true
    },
    plugins: [
        new HtmlPlugin({
            template: "./public/index.html"
        }),
        new InterpolateHtmlPlugin({ PUBLIC_URL: "" }),
        new webpack.EnvironmentPlugin({
            "NODE_ENV": "development"
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        // Workaround for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        })
    ]
};
