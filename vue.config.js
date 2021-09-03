module.exports = {
  devServer: {
    disableHostCheck: true
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    moment: {
      locales: [
        '.'
      ]
    }
  }
}
