const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: "production",
  context:path.resolve(__dirname, '../src'),
  entry: {
    vendor: ['vue', 'vuex', 'vue-router','echarts'],
    app:['@babel/polyfill','./index.js']
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
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor'
        },
        element: {
          chunks: 'all',
          name: 'element',
          test: /[\\/]element-ui[\\/]/,
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      hash: false,
      chunksSortMode: "none",
      assets: {
        favicon: '/assets/imgs/favicon.ico',
        config_js: '/config/conf.prod.js'
      }
    }),
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
    new CopyWebpackPlugin([
      {
        from:'./public',
        to: './'
      }
    ])
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'], //自动解析确定的扩展。覆盖原有扩展
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@public': path.resolve(__dirname, '../src/public')
    }
  },
  externals: {
    'FRONT_CONF': 'FRONT_CONF'
  }
};
