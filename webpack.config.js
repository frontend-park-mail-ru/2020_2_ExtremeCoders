const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: false
    },

    entry: {
        main: './src/main.js'
    },

    // https://webpack.js.org/concepts/output/
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    // https://webpack.js.org/plugins/html-webpack-plugin/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: false
        })
    ],

    module: {
        // https://webpack.js.org/concepts/loaders/
        rules: [
            // https://www.npmjs.com/package/fest-webpack-loader
            {
                test: /\.xml$/,
                use: [
                    {
                        loader: 'fest-webpack-loader'
                    }
                ]
            },
            // https://webpack.js.org/loaders/url-loader/
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            // https://webpack.js.org/loaders/babel-loader/
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            // https://webpack.js.org/loaders/css-loader/
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // https://webpack.js.org/loaders/sass-loader/
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // 'resolve-url-loader',
                    // 'url-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
      
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};