const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: __dirname + '/app/index.js'
    },
    output: {
        path: __dirname + '/dist/res',
        filename: 'js/[name]-[hash].js',
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
            // 样式打包成一个css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'}
                    ]
                })
            },
        ]
    },

    devServer: {
        contentBase: __dirname + '/dist',
        // inline: true,
        // hot: true,
        // GZIP
        compress: true,
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
        new ExtractTextPlugin("css/styles.css"),
        // new webpack.HotModuleReplacementPlugin(),
    ]
};