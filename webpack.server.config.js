const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const rootDir = process.cwd();

module.exports = {
    context: rootDir,
    mode: 'development',

    devtool: 'inline-source-map',

    entry: [
        'webpack/hot/poll?1000',
        './index.js'
    ],

    watch: true,
    target: 'node',
    node: {
        __dirname: true
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],

    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }],
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    stats: {
        warningsFilter: /export .* was not found in/
    },

    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify("server")
            }
        })
    ],

    output: {
        path: path.join(rootDir, '/.build'),
        filename: 'server.js'
    }
};