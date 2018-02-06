const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseCss = new ExtractTextPlugin('css/base.css');
const appCss = new ExtractTextPlugin('css/app-[hash:8].css');
const cssOptions = {
    fallback: 'style-loader',
    use: [
        {
            loader: 'css-loader',
            options: {
                minimize: true
            }
        }
    ]
};

module.exports = {
    entry: {
        vendor: ['angular', 'angular-ui-router'],
        app: __dirname + '/app/index.js'
    },
    output: {
        path: __dirname + '/dist/res',
        filename: 'js/[name]-[hash:8].js',
        publicPath: '/'
    },

    module: {
        rules: [
            // 转译为es2015
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            // 打包css中的字体文件
            {
                test: /(\.ttf|\.woff2|\.woff|\.eot|\.svg|\.dtd)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'css/fonts/'
                        }
                    }
                ]
            },
            // app样式打包成一个css文件
            {
                test: /\.css$/,
                use: appCss.extract(cssOptions),
                exclude: /node_modules/
            },
            // 公共样式打包成一个css文件
            {
                test: /\.css$/,
                use: baseCss.extract(cssOptions),
                include: /node_modules/
            },
        ]
    },

    plugins: [
        // 重新打包时清理dist/res文件夹
        new CleanWebpackPlugin(['dist/res/**/**'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        // 生成默认模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/app/index.html'
        }),
        // 打包css文件路径、文件名
        appCss, baseCss,
        // 热更新
        // new webpack.HotModuleReplacementPlugin(),
        // 提取公共js模块
        new webpack.optimize.CommonsChunkPlugin({
            // 对应的entry数组vendor
            name: 'vendor',
            filename: 'js/vendor.js',
            // 保证没有其他模块打包进该公共模块
            minChunks: Infinity
        }),
        // 压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};