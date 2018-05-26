const jojo = require('jojo-mock')
const config = require('./config')

const app = jojo.MockServer(config)

module.exports = app