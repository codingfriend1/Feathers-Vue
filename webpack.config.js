const webpack = require('webpack')
const path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")



const configs = []

const isProduction = process.env.NODE_ENV === 'production'

const node = /node_modules/

const folders = {
  root: path.resolve(__dirname),
  node_modules: path.resolve(__dirname, 'node_modules'),
  bundle: path.resolve(__dirname, 'public'),
  src: path.resolve(__dirname, 'src'),
  renderer: path.resolve(__dirname, 'vue-server-side-rendering.js'),
  serve: path.resolve(__dirname, 'public', '/'),
  app: path.resolve(__dirname, 'app'),
  styles: path.resolve(__dirname, 'app/styles.js')
}

const modules = {
  module : {
    preLoaders: [
      { test: /\.json$/, loader: 'json'},
    ],
    loaders : [
      {
        test: /mongoose/,
        loader: 'null'
      },
      {
        test: /\.js$/,
        loader: 'babel?cacheDirectory',
        exclude: node,
        include: [
          folders.app,
          folders.renderer
        ]
      },
      {
        test: /\.jade$/,
        loaders: ["string", "jade-html"],
        exclude: node,
        include: [
          folders.app,
          folders.renderer
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        exclude: node,
        include: [
          folders.app,
          folders.renderer
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
        include: [
          folders.app,
          folders.renderer
        ]
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader"),
        include: [
          folders.app,
          folders.renderer
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },
  // noParse: [
  //   folders.node_modules
  // ],
  vue: {
    loaders: {
      js: 'babel',
      css: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader"),
      stylus: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader"),
      html: 'jade'
    }
  },
  plugins: isProduction? [
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]: [
    new ExtractTextPlugin("style.css")
  ]
}

configs[0] = Object.assign({
  entry: ['babel-polyfill', path.join(folders.app, 'app.js')],
  output: {
    path: path.join(folders.bundle, 'app'),
    pathinfo: true,
    filename: 'app.js',
    sourceMapFilename: "[file].map"
  },
  devtool: isProduction? null: "cheap-source-map",
  resolve: {
    modules: ['node_modules'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}, modules);

configs[1] = Object.assign({
  target: 'node',
  entry: ['babel-polyfill', path.join(folders.root, 'vue-server-side-rendering.js')],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(folders.root, 'src'),
    filename: 'compiled-ssr.js'
  }
}, modules)


module.exports = configs
