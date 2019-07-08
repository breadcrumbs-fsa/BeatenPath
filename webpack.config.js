const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  // plugins: [
  //   new WorkboxPlugin.GenerateSW({
  //     // these options encourage the ServiceWorkers to get in there fast
  //     // and not allow any straggling "old" SWs to hang around
  //     clientsClaim: true,
  //     skipWaiting: true,
  //     cleanupOutdatedCaches: true,
  //     swDest: 'service-worker.js'
  //   })
  // ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
