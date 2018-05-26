const path = require('path')
const api = require('./api')

const rootDir = process.cwd()
const srcDir = path.join(rootDir, 'src')

module.exports = {
    api: {
        path: '/',
        routers: [
            api
        ]
    },
    database: [{
        path: '/api',
        data: path.resolve(srcDir, './data.json')
    }, {
        path: '/db',
        data: path.resolve(srcDir, './data.json')
    }],

    proxy: {
        enable: false,
        host: 'http://localhost:2000',

        routes: [
            { "url": "/api/users*", "options": {} }
        ]
    },

    static: [{
        path: '/static',
        dir: srcDir
    }]
}