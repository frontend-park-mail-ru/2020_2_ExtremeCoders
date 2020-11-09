var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    entry: [
        './src/main.js',
        './src/Views/public/css/main.css'
    ],
    module:{
        rules:[
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: './src/index.html'
        })
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
