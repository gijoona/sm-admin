module.exports = {
  devServer: {
    disableHostCheck: true,
    overlay: false
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
