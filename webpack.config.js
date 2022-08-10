const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        popup: path.resolve(__dirname, 'src/scripts/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader"
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, 'src/template.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/icons'),
                    to: path.resolve(__dirname, 'dist/icons'),
                },
                {
                    from: path.resolve(__dirname, 'extensionFiles'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        }),
    ],
    devtool: 'cheap-module-source-map'
}