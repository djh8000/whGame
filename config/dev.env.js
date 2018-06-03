'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL: {
    api: '"http://tiku.dev.zejicert.cn/"',
    http: '"http://dev.mbbs.zejicert.cn/"',
    uchttp: '"http://dev.uc.zejicert.cn/"'
  }
})
