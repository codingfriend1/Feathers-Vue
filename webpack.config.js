require('colors')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const AsyncAwaitPlugin = require('webpack-async-await')
const TapWebpackPlugin = require('tap-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const configs = []

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const node = /node_modules/

const folders = {
  root: path.resolve(__dirname),
  node_modules: path.resolve(__dirname, 'node_modules'),
  public: path.resolve(__dirname, 'public'),
  server: path.resolve(__dirname, 'server'),
  app: path.resolve(__dirname, 'app'),
  boot: path.resolve(__dirname, 'app', 'boot'),
}

const base = {
  module : {
    loaders : [
      {
        test: /mongoose/,
        loader: 'null'
      },
      {
        test: /\.jade$/,
        loaders: ["string-loader", "jade-html-loader"],
        exclude: node,
        include: [
          folders.app
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: node,
        include: [
          folders.app
        ],
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: 'css-loader'
            }),
            styl: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: 'css-loader!stylus-loader'
            }),
            stylus: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: 'css-loader!stylus-loader'
            }),
            html: 'jade'
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader'
        }),
        include: [
          folders.app
        ]
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!stylus-loader'
        }),
        exclude: node,
        include: [
          folders.app
        ]
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
      // {
      //   test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: "url-loader"
      // },
      // {
      //   test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      //   loader: 'file-loader'
      // }
    ]
  },

  // Dev plugins

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new AsyncAwaitPlugin({
      awaitAnywhere:true,
      asyncExits:true
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new ProgressBarPlugin({
      format: ' [:bar] ' + ':percent'.bold + ' (:msg)'
    }),
    new FriendlyErrorsPlugin({
      clearConsole: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })

  // Production plugins

  ].concat(isProduction ? [

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJSPlugin({
        uglifyOptions: {
          beautify: false,
          ecma: 6,
          compress: true,
          comments: false
        }
      })
    // new webpack.optimize.UglifyJsPlugin({
    //   // sourceMap: false,
    //   // minimize: true,
    //   // compress: {
    //   //   warnings: false
    //   // },
    //   uglifyOptions: {
    //     beautify: false,
    //     ecma: 6,
    //     compress: true,
    //     comments: false
    //   }
    // }),

  ] : []),
  performance: {
    hints: false
  }
}

configs[0] = merge({}, base, {
  entry: folders.boot,
  output: {
    path: folders.public,
    publicPath: '/public/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    sourceMapFilename: "[file].map"
  },
  externals: isTest ? nodeExternals(): undefined,
  devtool: isProduction ? false : isTest ? "inline-cheap-module-source-map" : "cheap-source-map",
  resolve: {
    modules: ['node_modules'],
    mainFields: ['browser', 'main'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@app': path.resolve(__dirname, 'app')
    }
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: [
        "index.html", 
        "vue-ssr-server-bundle.json", 
        "favicon.ico",
        "images/**/*",
        "fonts/**/*"
      ],
    }),
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(folders.app, 'index.template.html'),
      inject: true
    })
  ]
})

configs[1] = merge({}, base, {
  target: 'node',
  entry: {
    app: path.resolve(folders.app, 'server-entry.js')
  },
  externals: nodeExternals({
    whitelist: /(\.css$|\.less$|\.sass$|\.scss$|\.styl$|\.stylus$|\.(png|jpe?g|gif|svg)(\?.*)?$|\.(woff2?|eot|ttf|otf)(\?.*)?$)/
  }),
  output: {
    libraryTarget: 'commonjs2',
    path: folders.public,
    filename: '[name].js'
  },
  devtool: isProduction ? false : isTest ? "inline-cheap-module-source-map" : "cheap-source-map",
  plugins: [
    new VueSSRServerPlugin()
  ]
})

module.exports = isTest? configs[0] : configs
