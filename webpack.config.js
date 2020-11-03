var path = require('path');
module.exports = {
    entry: './src/main.js',
    module:{
        rules:[
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

