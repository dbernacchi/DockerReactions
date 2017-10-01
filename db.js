let config = require('./knexfile')
let environment = process.env.NODE_ENV || 'development'
let knex = require('knex')(config[environment])
let bookshelf = require('bookshelf')(knex)
bookshelf.plugin('registry')


module.exports = bookshelf;
