const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js',
        './styles/styles.scss'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ""
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css', {allChunks: true, minimize: true}),
        new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'styles/fonts'), to: path.join(__dirname, './dist/fonts'),
                },
            ], {copyUnmodified: true}
        ),
        new webpack.optimize.UglifyJsPlugin({
            screw_ie8: true,
            compressor: {
                warnings: false,
            },
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.js|\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', "react"]
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=./images/[name].[ext]',
            },
        ]
    }

};