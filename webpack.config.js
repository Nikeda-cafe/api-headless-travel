const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './public/src/js/app.js',
    },
    output: {
        path: path.resolve(__dirname,'public'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: [/\.css$/,/\.scss$/],
                // include: path.resolve(__dirname,'public/src/scss'),
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
}