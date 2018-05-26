const Server = require('./server')

let app = require('./src/app')
let config = require('./server/config')
let server = new Server(app)

server.start(config)

if (module.hot) {
    module.hot.decline()

    module.hot.accept(['./server/config'], () => {
        try {
            config = require('./server/config')
            server.restart(config)
        } catch(e) {
            (console.error || console.log).call(console, e.stack || e);
        }
    })

    module.hot.accept(['./src/app'], () => {
        try {
            server.app = require('./src/app')
        } catch(e) {
            (console.error || console.log).call(console, e.stack || e);
        }
    })
}