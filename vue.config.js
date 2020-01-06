// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? './' : '/',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc:'./service-worker-prod.js'
    },

    inlineWorkboxRuntime: true,
    precacheManifestFilename:"cache.js",
    themeColor: '#1da025',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}
