var path = require('path');
var glob = require('globby');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
var Ex = require('extract-text-webpack-plugin');

module.exports = [
    {
        entry: {
            'app': ['babel-polyfill','./src/main.js'],
            // 'commom':['babel-polyfill','./src/page/common/index.js'],
            // 'index':['babel-polyfill','./src/page/index/index.js'],
            // 'login':['babel-polyfill','./src/page/login/index.js']
        },//值可以是字符串、数组或对象
        output: {
            path: path.resolve(__dirname, './dist'),//Webpack结果存储
            publicPath: '/dist/',//“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
            filename: './js/[name].js',
            chunkFilename: './js/[name].[chunkhash:5].js'
        },
        plugins: [
            // make sure to include the plugin for the magic
            new VueLoaderPlugin(),
            //这里会按照output的路径打包到css文件夹下面对应的css的名字
            new Ex({
                filename: 'css/[name].css',
                allChunks: true
             }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options:{
                        plugins:['syntax-dynamic-import']
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'imgs/[name].[ext]?[hash]'
                    }
                },
                {
                    test:/\.css$/,
                    use:Ex.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                }
            ]
        },
        externals: {//可以把外部的变量或模块加载进来,比如cdn引入的jquery,想要按需模块化引入
            'vue': 'Vue'
        },
        performance: {
            hints: false
        },
        devtool: 'cheap-module-eval-source-map'
    }
];
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

