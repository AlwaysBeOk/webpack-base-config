
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式, 使用该插件需要独立下载'npm install extract-text-webpack-plugin --save-dev', 同时下面的rules也必须更改
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 这个是没有加css module的配置
const baseConfig = {
  entry: {
    vendor:['jquery'],
    commons:["./common/util.a.js","./common/util.b.js"], //入口文件不管文件中是否用到，都会引入
    main:"./index.js"
  },
  module: {
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
              options: { importLoaders: 1, }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          publicPath:''
        }),
        exclude:[path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /.(jpg|png|gif|svg)$/,
        use: ['url-loader?limit=819&name=./images/[name].[ext]&publicPath=']
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({ /*解析less, 把less解析成浏览器可以识别的css语言*/
          fallback:'style-loader',
          use:['css-loader','sass-loader']
        })
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 拷贝第三方js库到out文件夹下面s
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname+'/src/external.js'),
        to: './'
        // ignore: [ '*.js' ]  //忽略某一部分文件
      }
    ]),
  ],
  optimization: {
    //common 插件
    splitChunks:{
      chunks: "all",//同时分割同步和异步代码,推荐。
      minSize: 0,
      minChunks: 1, //最小引入次数
      maxAsyncRequests: 5, //按需加载最大请求次数为5的所有模块就行拆分到一个单独的代码块中
      maxInitialRequests: 3, //初始化加载最大请求次数为3的所有模块就行拆分到一个单独的代码块中
      name: true,
      //缓存组，将多次引用的模块test 缓存到
      cacheGroups:{
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: false,
        //打包重复出现的代码
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        //打包第三方类库
        commons: {
          name: "commons", // name 就是具体匹配到某一个entry 入口文件，test 就是具体匹配到 正则匹配到的具体文件或文件夹
          chunks: "initial",
          minChunks: Infinity
        }
      }
    }
  },
};

// 这个是加css module的配置
const baseConfig2 = {
  entry: {
    vendor:['jquery'],
    commons:["./common/util.a.js","./common/util.b.js"], //入口文件不管文件中是否用到，都会引入
    main:"./index.js"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ['babel-loader']
      },
      //{test: /.css$/, use: ['style-loader', 'css-loader']},/*解析css, 并把css添加到html的style标签里*/
      // 普通模式
      {
        test: new RegExp(`^(?!.*\\.module).*\\.css`),
        use: ExtractTextPlugin.extract({/*解析css, 并把css变成文件通过link标签引入*/
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          publicPath:''
        }),
        exclude:[path.resolve(__dirname, '..', 'node_modules')]
      },
      // css module
      {
        test: new RegExp(`^(.*\\.module).*\\.css`),
        use: ExtractTextPlugin.extract({/*解析css, 并把css变成文件通过link标签引入*/
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]_[hash:base64:6]',
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          publicPath:''
        }),
        exclude:[path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /.(jpg|png|gif|svg)$/,
        use: ['url-loader?limit=819&name=./images/[name].[ext]&publicPath=']
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({ /*解析less, 把less解析成浏览器可以识别的css语言*/
          fallback:'style-loader',
          use:['css-loader','sass-loader']
        })
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 拷贝第三方js库到out文件夹下面s
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname+'/src/external.js'),
        to: './'
        // ignore: [ '*.js' ]  //忽略某一部分文件
      }
    ]),
  ],
  optimization: {
    //common 插件
    splitChunks:{
      chunks: "all",//同时分割同步和异步代码,推荐。
      minSize: 0,
      minChunks: 1, //最小引入次数
      maxAsyncRequests: 5, //按需加载最大请求次数为5的所有模块就行拆分到一个单独的代码块中
      maxInitialRequests: 3, //初始化加载最大请求次数为3的所有模块就行拆分到一个单独的代码块中
      name: true,
      //缓存组，将多次引用的模块test 缓存到
      cacheGroups:{
        // jquery:{
        //   test:'jquery', //要写test设置项，不然会打包工程下所有的js文件
        //   chunks:'initial',
        //   name:'jquery',
        //   enforce:true
        // }
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        //打包第三方类库
        commons: {
          name: "commons", // name 就是具体匹配到某一个entry 入口文件，test 就是具体匹配到 正则匹配到的具体文件或文件夹
          chunks: "initial",
          minChunks: Infinity
        }
      }
    }
  },
};

module.exports = baseConfig2;
