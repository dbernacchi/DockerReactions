const express = require('express')
const router = express.Router()

const Queue = require('../models/queue')
const Event = require('../models/event')

const helpers = require('../helpers')

router.get('/', (req, res) => {
  // get live events, poll for latest reaction data, drop in queue
  helpers.getLiveEvents()
    .then(events => {
      let currentEvent = {}
      let reactions = []

      for (let i = 0; i < events.length; i++) {
        reactions.push(helpers.getReactions(helpers.getItemIdFromURL(events.models[i].get('url'))))
      }
      Promise.all(reactions).then(function(results) {
        for(let i = 0; i < results.length; i++) {
          let aggregate = helpers.aggregateReactions(results[i])
          new Queue({'event_id': events.models[i].get('id'), data: JSON.stringify(aggregate)}).save()
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

router.get('/process', (req, res) => {
  let blankLog = function(event_id) {
    return {
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
  // get queued items by event in timestamp order, compare to most recent entry in log, make log entry
  helpers.getQueuedItems()
    .then(liveEvents => {
      let items = []
      let log = {}
      for(let i = 0; i < liveEvents.models.length; i++) {
        items = liveEvents.models[i].related('queue')
        log = blankLog()
        if(liveEvents.models[i].related('log').length > 0) {
          log = liveEvents.models[i].related('log').models[0]
        }
        for (let j = 0; j < items.models.length; j++) {
          // if the item is after 'log.ts', create a log for it based on diff from log values
          if(items.models[j]){
            // see previous comment
          }
        }
      }
    })
})

module.exports = router
