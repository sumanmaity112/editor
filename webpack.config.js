const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'node_modules/brace/ext/language_tools.js'),
                    to: path.join(__dirname, 'dist/brace/ext'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/mode/json.js'),
                    to: path.join(__dirname, 'dist/brace/mode'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/mode/javascript.js'),
                    to: path.join(__dirname, 'dist/brace/mode'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/mode/sql.js'),
                    to: path.join(__dirname, 'dist/brace/mode'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/mode/sh.js'),
                    to: path.join(__dirname, 'dist/brace/mode'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/mode/plain_text.js'),
                    to: path.join(__dirname, 'dist/brace/mode'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/theme/monokai.js'),
                    to: path.join(__dirname, 'dist/brace/theme'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/theme/github.js'),
                    to: path.join(__dirname, 'dist/brace/theme'),
                }, {
                    from: path.join(__dirname, 'node_modules/brace/worker'),
                    to: path.join(__dirname, 'dist/brace/worker'),
                },
            ], {copyUnmodified: true}
        ),
        new webpack.optimize.UglifyJsPlugin({
            screw_ie8: true,
            compressor: {
                warnings: false,
            },
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', "react"]
                },
                include: path.join(__dirname, 'src')
            }
        ]
    }

};