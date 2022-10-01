const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    watch: true,
    mode: 'production',
    entry: {
        main: './public/src/js/app.js',
    },
    output: {
        path: path.resolve(__dirname,'public'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'stylesheets/bundle.min.css',
        })
    ],
    module: {
        rules: [
            {
                test: [/\.css$/,/\.scss$/],
                // include: path.resolve(__dirname,'public/src/scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin(), 
            new CssMinimizerPlugin(),
        ],
    },
}