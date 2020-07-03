module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  },
  devServer: {
        proxy:  'https://gateway.merchantprocess.net',
  } 

}