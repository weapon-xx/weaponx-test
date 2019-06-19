'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')    // 分离 css 样式文件

const cdnPrefix = '',
      buildPath = '/dist/',
      publishPath = cdnPrefix + buildPath;

//编译输出路径
module.exports = {
    mode: 'development',
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
            options: {
                
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            "useBuiltIns": "entry",
                        }
                    ],
                    // [
                    //     "env", {
                    //     "modules": false
                    //     }
                    // ],
                    // "stage-2"
                ],
                plugins: [
                    [
                        'test',
                        {
                            'a': 'jacksonx',
                        },
                    ],
                    // "transform-runtime",
                ],
            },
        }]
    },
    optimization: {
        // runtimeChunk: {
        //     name: 'manifest'
        // },
        // minimize:false,
        splitChunks: {
          chunks: 'all',
          name: 'common',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    devtool: 'cheap-module-eval-source-map' //'source-map'
};
