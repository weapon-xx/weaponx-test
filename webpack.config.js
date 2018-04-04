'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')    // 分离 css 样式文件
const isProduction = () => {
    return process.env.NODE_ENV === 'production'
}

//webpack插件
// const plugins = [
    //提公用js到common.js文件中
    // new webpack.optimization.splitChunks('common.js'),
    //将样式统一发布到style.css中
    // new ExtractTextPlugin("style.css", {
    //     allChunks: true,
    //     disable: false
    // }),
    // // 使用 ProvidePlugin 加载使用率高的依赖库
    // new webpack.ProvidePlugin({
    //   $: 'webpack-zepto'
    // }),
    // new webpack.EnvironmentPlugin([
    //   "branch","NODE_ENV"
    // ])
// ];

const entry = [
  './webpack/index.js'
],
cdnPrefix = '',
buildPath = '/dist/',
publishPath = cdnPrefix + buildPath;

//生产环境js压缩和图片cdn
if (isProduction()) {
    plugins.push(new webpack.optimize.UglifyJsPlugin())
    cdnPrefix = ''
    publishPath = cdnPrefix
}

//编译输出路径
module.exports = {
    entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: '[name].build.js',0
        publicPath: publishPath,
        chunkFilename: '[id].build.js?[chunkhash]'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel-loader',
        }]
    },
    // optimization: {
    //     runtimeChunk: {
    //         name: 'manifest'
    //     },
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendor',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },
    devtool: '#source-map'
};
