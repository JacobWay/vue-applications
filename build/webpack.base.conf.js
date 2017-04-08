var config = require('../config/index.js')

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.vue']
    }
}
