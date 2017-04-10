var path = require('path')
var config = require('../config/index.js')
var utils = require('./utils.js')
var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV;
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

function resolve(dir) {
    var dirPath = path.resolve(__dirname, "..", dir)
    return dirPath
}

var bulletinDir = resolve('src/bulletin')
var otherAppDir = resolve('src/otherApp')
var tradeDir = resolve('src/trade')

module.exports = {
    entry: {
        bulletinMain: path.join(bulletinDir, 'scripts/main.js'),
        otherAppMain: path.join(otherAppDir, 'scripts/main.js'),
        tradeMain: path.join(tradeDir, 'scripts/main.js')
    },
    output: {
        path: config.build.assetsRoot,
        filename: 'scripts/[name]-[hash].js',
        publicPath: config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: projectRoot,
            exclude: /node_modules/,
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    }
}
