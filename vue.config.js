// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? './' : './',
  pwa: {
    name: 'DocAppsUI',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './service-worker-prod.js',
      swDest: 'service-worker.js'
    },
    manifestOptions: {
      background_color: '#ffffff',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    themeColor: '#1da025',
    msTileColor: '#1da025',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}
