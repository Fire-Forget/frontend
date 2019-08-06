const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const serve =require('./serve');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, '../dist');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  context: path.resolve(__dirname, '../src'),
  entry: {
    vendor: ['vue', 'vuex', 'vue-router'],
    app: [ `webpack-dev-server/client?http://${serve.host}:${serve.port}/`,'@babel/polyfill', './main.js']
  },
  output: {
    path: buildPath,
    publicPath: "/",
    chunkFilename: "js/[name].[hash].js",
    filename: "js/[name].[hash].js",
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|webp)(\?|$)/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  performance: {
    hints: false,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "index.ejs",
      hash: false,
      chunksSortMode: "none",
      assets: {
        config_js: '/config/conf.dev.js'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
    new CopyWebpackPlugin([{
      from: './public',
      to: './'
    }])
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.vue'], //自动解析确定的扩展。覆盖原有扩展
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      '@public': path.resolve(__dirname, '../src/public'),
      '@nm': path.resolve(__dirname, '../node_modules')
    }
  },
  devServer: {
    disableHostCheck: true,
    contentBase: require('path').join(__dirname, "dist"),
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: serve.port,
    host: serve.host,
    proxy: {
      '/api/v1': {
          target: 'http://10.252.96.163:8819',
        // target: 'http://10.252.96.206:8818',
        changeOrigin: true
        },
      '/api/v2':{
        target: 'http://10.252.96.163:8811',
        // target: 'http://10.252.96.206:8810',
        changeOrigin: true
      }
    },
    hotOnly: true,
  }
};
