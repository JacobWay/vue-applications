var path = require('path')

module.exports = {
    build: {
        assetsPublicPath: '/',
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        productionSourceMap: true,
    },
    dev: {
        env: require('./dev.env.js'),
        port: 8888,
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        cssSourceMap: false,
        proxyTable: {
            '/api': {
                target: 'http://localhost:7777',
                changeOrigin: true
            }
        }
    }
}
