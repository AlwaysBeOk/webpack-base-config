const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');//引入打包后的代码

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//代码压缩

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//css 压缩文件


let config = {
  output:{
    filename:"./[name].[chunkhash:8].js", //设置多个文件出口，可以后面加上hash
    path: __dirname + '/out',
    publicPath: ""   //静态资源公共路径
  },
  mode: 'production',
  devtool: 'source-map',
  plugins:[
    //打包出css文件到out文件夹
    new ExtractTextPlugin({
      filename: './index.[chunkhash:8].css',
      allChunks: true,
      disable: false
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /index\.[a-z 0-9]{8}\.css$/g, //匹配到out文件夹中css进行压缩
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: false
    }),
    //清除文件夹再构建
    new CleanWebpackPlugin(['*'], {
      root: __dirname + '/out',
      verbose: true,
      dry: false,
      //exclude: ["dist/1.chunk.js"]
    }),
    //打包出html文件到out文件夹
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    //压缩js
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ]
  }
};

module.exports = config;
