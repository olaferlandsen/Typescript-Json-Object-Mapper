const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    target: "node",
    mode: "production",
    entry: __dirname + '/src/index.ts',
    externals: [nodeExternals()],
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
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
        extensions: ['.ts', '.tsx','.webpack.js', '.web.js', '.js']
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/build',
        libraryTarget: 'umd',
        library: 'TypescriptJsonObjectMapper',
        umdNamedDefine: true
    },
    optimization: {
        minimize: false,
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
    },
    plugins: [
        new CleanWebpackPlugin(["./dist"], {verbose: false})
    ]
};
