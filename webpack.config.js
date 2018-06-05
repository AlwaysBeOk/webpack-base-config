const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');//引入打包后的代码

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//代码压缩

const ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式, 使用该插件需要独立下载'npm install extract-text-webpack-plugin --save-dev', 同时下面的rules也必须更改

const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件

const autoprefixer = require('autoprefixer')({'browsers': ['> 1%', 'last 2 versions']});


module.exports = {
  // entry: ["./index.js","./external.js"],//可以将数组内多个入口文件打包成一个文件
  //这里可以设置多入口文件 可以将一个库单独引入
  entry: {
    common:["./common/util.a.js","./common/util.b.js"],
    jquery: "jquery",
    main:"./index.js"
  },
  output:{
    filename:"./[name].[chunkhash:8].js", //设置多个文件出口，可以后面加上hash
    path: __dirname + '/out',
    publicPath: ""   //静态资源公共路径
  },
  module : {
    rules: [
      {
        test: /.js$/,
        use: ['babel-loader']
      },
      //{test: /.css$/, use: ['style-loader', 'css-loader']},/*解析css, 并把css添加到html的style标签里*/
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({/*解析css, 并把css变成文件通过link标签引入*/
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },'postcss-loader'
            // {
            //   loader:'postcss-loader',
            //   options: {
            //     plugins: autoprefixer
            //   }
            // }
          ]})
      },
      {
        test: /.(jpg|png|gif|svg)$/,
        use: ['url-loader?limit=819&name=./images/[name].[ext]&publicPath=']
        },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']/*解析less, 把less解析成浏览器可以识别的css语言*/
      }
    ]
  },
  // devtool: 'source-map',
  plugins:[
    //TODO
    new webpack.ProvidePlugin({
      jquery: 'jquery'
    }),
    // 拷贝第三方js库到out文件夹下面
    new CopyWebpackPlugin([
      {
        from: './src/external.js',
        to: './'
        // ignore: [ '*.js' ]  //忽略某一部分文件
      }
    ]),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: autoprefixer()
    //   }
    // }),
    //打包出css文件到out文件夹
    new ExtractTextPlugin({
      filename: './index.[chunkhash:8].css',
      allChunks: true,
      disable: false
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
    })
  ],
  optimization: {
    // runtimeChunk: true,
    //压缩js
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ],
    //common 插件
    splitChunks:{
      // chunks: "async",
      // minSize: 30000,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups:{
        jquery:{
          test:'jquery', //要写test设置项，不然会打包工程下所有的js文件
          chunks:'initial',
          name:'jquery',
          enforce:true
        }
        // commons: {
        //   name: 'common',
        //   chunks: 'initial',
        //   minChunks: 2,
        //   maxInitialRequests: 100,
        //   minSize: 0,
        //   enforce: true
        // },
        // 公共第三方库引入
        // vendor: {
        //   test: '/node_modules/',
        //   chunks: 'initial',
        //   name: 'vendor',
        //   priority: 10,
        //   enforce: true
        // }
      }
    }
  }
};
