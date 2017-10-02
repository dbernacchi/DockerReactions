const bookshelf = require('../db')

require('./log')

module.exports = bookshelf.model('Event', {
  tableName: 'event',
  log: function() {
    return this.hasMany('Log', 'event_id');
  }
})
