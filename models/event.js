const bookshelf = require('../db')

require('./queue')
require('./log')

module.exports = bookshelf.model('Event', {
  tableName: 'event',
  queue: function() {
    return this.hasMany('Queue', 'event_id');
  },
  log: function() {
    return this.hasMany('Log', 'event_id');
  }
})
