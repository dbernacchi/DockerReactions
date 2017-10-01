const bookshelf = require('../db')

module.exports = bookshelf.model('Event', {
  tableName: 'event'
})
