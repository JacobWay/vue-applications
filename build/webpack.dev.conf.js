var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')

Object.keys(baseWebpackConfig.entry).forEach(function(name){
    baseWebpackConfig.entry[name] = ['./build/dev-client.js'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: './bulletin/pages/index.html',
            template: './src/bulletin/pages/index.html',
            inject: true,
            chunks: ['bulletinMain']
        }),
        new HtmlWebpackPlugin({
            filename: './otherApp/pages/index.html',
            template: './src/otherApp/pages/index.html',
            inject: true,
            chunks: ['otherAppMain']
        }),
        new HtmlWebpackPlugin({
            filename: 'trade/pages/main.html',
            template: './src/trade/pages/main.html',
            inject: true,
            chunks: ['trade']
        }),
    ]
})
