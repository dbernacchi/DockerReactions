const express = require('express')
const router = express.Router()

const Queue = require('../models/queue')
const Event = require('../models/event')

const helpers = require('../helpers')

router.get('/', (req, res) => {
  // todo: get active events, for each get reactions, drop into queue
  helpers.getLiveEvents()
    .then(events => {
      let currentEvent = {}
      let reactions = []
      // console.log(events)

      for (let i = 0; i < events.length; i++) {
        console.log(events.models[i].get('id'))
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
module.exports = router
