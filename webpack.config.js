'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')    // 分离 css 样式文件

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

const cdnPrefix = '',
buildPath = '/dist/',
publishPath = cdnPrefix + buildPath;

//生产环境js压缩和图片cdn
// if (isProduction()) {
//     plugins.push(new webpack.optimize.UglifyJsPlugin())
//     cdnPrefix = ''
//     publishPath = cdnPrefix
// }
//编译输出路径
module.exports = {
    mode: 'development' ,
    entry: [
      'babel-polyfill',
      './webpack/main.js'
    ],
    output: {
        path: __dirname + buildPath,
        filename: '[name].build.js',
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
    optimization: {
        // runtimeChunk: {
        //     name: 'manifest'
        // },
        minimize:false,
        splitChunks: {
          chunks: 'all',
          name: 'common',
            // cacheGroups: {
            //     commons: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name: 'vendor',
            //         chunks: 'all'
            //     }
            // }
        }
    },
    devtool: 'cheap-module-eval-source-map' //'source-map'
};
