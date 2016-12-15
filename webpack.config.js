'use strict'

var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = function() {
    return process.env.NODE_ENV === 'production';
}

var express = require('express'),
    app = express();

const api = {
  master: 'http://api.wisdomtmt.com/',
  android: 'http://api.android.wisdomtmt.com/',
  gamma: 'http://api.gamma.wisdomtmt.com/',
  testing: 'http://192.168.1.55:8080/',
  dev: 'http://192.168.1.52:8080/'
}

const address = {
  master: 'http://activity.wisdomtmt.com/',
  android: 'http://activity.android.wisdomtmt.com/',
  gamma: 'http://activity.gamma.wisdomtmt.com/',
  testing: 'http://192.168.1.55:8003/',
  dev: 'http://192.168.1.52:8003/'
}

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    }),
    // 单独打包 css
    new ExtractTextPlugin("[name].bundle.css"),
    //将样式统一发布到style.css中
    // new ExtractTextPlugin("style.bundle.css", {
    //     allChunks: true,
    //     disable: false
    // }),
    new webpack.DefinePlugin({
      config: JSON.stringify(api[process.env.branch]),
      share_config : JSON.stringify(address[process.env.branch])
    })
];

var entry = {
      start_signup : './src/public/javascript/start_signup.js',
      form : './src/public/javascript/form.js',
      publicity : './src/public/javascript/publicity.js',
      result : './src/public/javascript/result.js',
      signup_msg : './src/public/javascript/signup_msg.js',
      race_certificate : './src/public/javascript/race_certificate.js'
    },
    cdnPrefix = "..",
    buildPath = "/dist/",
    publishPath = cdnPrefix + buildPath;
//生产环境js压缩和图片cdn
if (isProduction()) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    cdnPrefix = "";
    publishPath = cdnPrefix;
}

//编译输出路径
module.exports = {
    debug: true,
      entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: '[name].bundle.js',
        publicPath: publishPath,
        chunkFilename:"[id].build.js?[chunkhash]"
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!less-loader!cssnext-loader")
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel'
        },{
            test: /\.(jpg|png|gif)$/,
            loader: "file-loader?name=[hash].[ext]"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime',
        ["component", [
          {
            "libraryName": "mint-ui",
            "style": true
          }
        ]]
      ]
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            vue: 'vue/dist/vue.js'
            //VueJS 2.0使用virtual-dom，并且import（或require）包括不能编译DOM的仅运行时构建。
            //需要将bundler配置为对独立版本进行别名vue
        }
    },
    plugins: plugins,
    devtool: 'cheap-module-eval-source-map'
};

const port = process.env.port || 8080;
app.use(express.static('./'));
app.listen(port,() =>{
  console.log(`\n
              *******
              web server is running on ${port}
              ********\n`)
})
