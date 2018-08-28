const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: false,
    mode: "production",
    entry: __dirname + '/src/index.ts',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /tests/,
                    /\.(spect|test)\.ts/
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        library: 'TypescriptJsonObjectMapper',
        umdNamedDefine: true
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            extractComments: true,
            parallel: true,
            sourceMap: true,
            include: /\.js$/,
            uglifyOptions: {
                comments: false,
                warnings: false,
                compress: {
                    global_defs: {"@alert": "console.log",},
                    drop_console: true
                },
                mangle: true,
                toplevel: false,
                ie8: false,
                safari10: false,
                keep_fnames: false,
                keep_classnames: false
            }
        })]
    }
};
