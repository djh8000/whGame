'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL: {
    api: '"http://106.12.13.190:82/platform-admin"',
  }
})
