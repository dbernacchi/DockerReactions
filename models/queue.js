const bookshelf = require('../db')

module.exports = bookshelf.model('Queue', {
  tableName: 'queue'
})
