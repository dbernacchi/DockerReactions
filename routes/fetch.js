const express = require('express')
const router = express.Router()

const Event = require('../models/event')
const Log = require('../models/log')

const helpers = require('../helpers')

router.get('/', (req, res) => {
  let blankLog = function(event_id) {
    return {
      'event_id': 0,
      'ts': 0,
      'NONE': 0,
      'LIKE': 0,
      'LOVE': 0,
      'WOW': 0,
      'HAHA': 0,
      'SAD': 0,
      'ANGRY': 0,
      'THANKFUL': 0,
      'PRIDE': 0
    }
  }
  // get live events, poll for latest reaction data, drop in queue
  helpers.getLiveEvents()
    .then(events => {
      let currentEvent = {}
      let reactions = []

      for (let i = 0; i < events.length; i++) {
        reactions.push(helpers.getReactions(helpers.getItemIdFromURL(events.models[i].get('url'))))
      }
      Promise.all(reactions).then(function(results) {
        let log = blankLog()
        for(let i = 0; i < results.length; i++) {
          log = helpers.aggregateReactions(results[i])
          log['event_id'] = events.models[i].get('id')
          new Log(log).save()
        }
        res.send({
          'result': 'SUCCESS'
        })
      })
      .catch(function(errors) {
        res.send({
          'result': 'FAILURE 1',
          'errors': errors
        })
      })
    })
    .catch(function(errors) {
      res.send({
        'result': 'FAILURE 2'
      })
    })
})

module.exports = router
