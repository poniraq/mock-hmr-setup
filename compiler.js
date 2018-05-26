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
    console.log('\n')
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

    console.log(stats.toString({
        chunks: false,
        assets: false,
        modules: false,
        warnings: false,
        errors: false,
        colors: true    // Shows colors in the console
    }))
    console.log('\n')
})