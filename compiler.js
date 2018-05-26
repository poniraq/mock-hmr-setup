const webpack = require('webpack')
const config = require('./webpack.server.config')

const compiler = webpack(config)
const watcher = compiler.watch({
    aggregateTimeout: 300,
    ignored: [
        'node_modules',
        'index.js'
    ],
    poll: false
}, (err, stats) => {
    if (err) {
        console.error(err.stack || err)
        if (err.details) {
            console.error(err.details)
        }
        return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
        console.error(info.errors)
    }
})