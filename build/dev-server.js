var webpack = require('webpack')
var express = require('express')
var config = require('../config/index.js')
var webpackConfig = require('./webpack.dev.conf.js')
var port = process.env.PORT || config.dev.port
var proxyMiddleware = require('http-proxy-middleware')

var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: 'index.html'
})
app.use(devMiddleware)

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})
app.use(hotMiddleware)

Object.keys(proxyTable).forEach(function(context){
    var options = proxyTable[context]
    if(typeof options === 'string'){
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})

var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
    return _resolve = resolve
})

console.log('> Starting dev server... ')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ', uri, '\n')
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
