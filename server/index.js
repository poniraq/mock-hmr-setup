const http = require('http')

class Server {
    _app
    httpServer

    constructor(
        app
    ) {
        this._app = app
    }

    start(config) {
        const { host, port } = config

        if (!this.httpServer) {
            this.httpServer = http.createServer(this.app)
        }
        this.httpServer.listen(port, host)
        console.log(`Server is listening on ${host}:${port}`)
    }
    restart(config) {
        if (this.httpServer) {
            console.log(`Server is shutting down...`)
            this.httpServer.close(() => {
                this.start(config)
            })
        } else {
            this.start(config)
        }
    }

    get app() { return this._app }
    set app(newApp) {
        const httpServer = this.httpServer
        const oldApp = this._app

        if (httpServer) {
            console.log('Rewiring listeners on existing server...')

            httpServer.removeListener('request', oldApp)
            httpServer.on('request', newApp)
        }

        this._app = newApp
    }
}

module.exports = Server

if (module.hot) {
    module.hot.decline()
}