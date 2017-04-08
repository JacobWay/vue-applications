var webpack = require('webpack')
var express = require('express')
var config = require('../config/index.js')
var webpackConfig = require('./webpack.dev.conf.js')
var port = process.env.PORT || config.dev.port

var app = express()
var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
})
app.use(devMiddleware)
app.listen(port)
