const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:
    {
        app: [
            'babel-polyfill',
            `${path.resolve(__dirname, 'common')}/containers/app`
        ]
    },
    output:
    {
        path: path.resolve(__dirname, 'public', 'asset/js/bundle/'),
        filename: 'bundle.min.js',
        publicPath: '/asset/js/bundle/',
        chunkFilename: 'chunk.[chunkhash].min.js'
    },
    module:
    {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'common'),
                exclude: /node_modules/,
                query:
                {
                    presets: [['env', { modules: false }], 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.css|\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style',
                        use: [
                            'css',
                            'sass',
                            'postcss'
                        ]
                    }
                )
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
            }
        ],
        exprContextCritical: false
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new CleanWebpackPlugin(['./public/asset/js/bundle']),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\'production\'' }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NormalModuleReplacementPlugin(
            /.\/containerServer/,
            './containerClient'
        ),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
            },
            comments: false
        }),
        
        new ExtractTextPlugin({
            filename: '../../css/bundle/bundle.min.css',
            allChunks: true
        })
    ],
};
