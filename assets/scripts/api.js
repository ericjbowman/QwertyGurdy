'use strict'

const config = require('./config')
// const store = require('./store')

const indexUploads = () => {
  return $.ajax({
    url: config.apiUrl + '/uploads',
    method: 'GET'
  })
}

module.exports = {
  indexUploads
}
