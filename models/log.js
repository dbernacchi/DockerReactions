const bookshelf = require('../db')
require('./event')

module.exports = bookshelf.model('Log', {
  tableName: 'log',
  event: function() {
    return this.belongsTo('Event');
  }
})
