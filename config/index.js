var path = require('path')

module.exports = {
    build: {
        assetsPublicPath: '/',
        assetsRoot: path.resolve(__dirname, '../dist')
    },
    dev: {
        env: require('./dev.env.js'),
        port: 8888,
        assetsPublicPath: '/'
    }
}
