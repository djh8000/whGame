'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL: {
    api: '"http://hc.hcan.com.cn/platform"',
  }
})
