const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        app: path.join(__dirname, "src", "index.tsx"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: "react-jupyter-notebook-viewer",
        publicPath: "/",
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser.js",
        }),
    ],
    externals: {
        react: "react",
    },
};