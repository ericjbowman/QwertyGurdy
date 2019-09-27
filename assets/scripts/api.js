'use strict'

const config = require('./config')
// const store = require('./store')

const indexUploads = () => {
  return $.ajax({
    url: config.apiUrl + '/uploads',
    method: 'GET'
  })
}

const indexOneShots = () => {
  return $.ajax({
    url: config.apiUrl + '/oneShots',
    method: 'GET'
  })
}

const indexExamples = () => {
  return $.ajax({
    url: config.apiUrl + '/examples',
    method: 'GET'
  })
}

module.exports = {
  indexUploads,
  indexOneShots,
  indexExamples
}
