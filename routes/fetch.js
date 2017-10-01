const express = require('express')
const router = express.Router()

const Queue = require('../models/queue')
const Event = require('../models/event')

const helpers = require('../helpers')

process
router.get('/', (req, res) => {
  // todo: get active events, for each get reactions, drop into queue
  helpers.getLiveEvents()
    .then(events => {
      let currentEvent = {}
      // console.log(events)
      for (let i = 0; i < events.length; i++) {
        currentEvent = events.models[i]
        console.log(currentEvent.get('id'))
        let itemID = helpers.getItemIdFromURL(currentEvent.get('url'))
        new Queue({'event_id': currentEvent.get('id')}).save()
          .then(model => {
            helpers.getReactions(itemID)
              .then(reactions => {
                let aggregate = helpers.aggregateReactions(reactions)
                model.save({data: JSON.stringify(aggregate)}, {patch: true})
                // res.send({
                //   'result': 'SUCCESS',
                //   'data': aggregate
                // })
              })
              .catch(error => {
                console.log('wtf, mate?')
                // res.send({
                //   'result': 'FAILURE',
                //   'error': error
                // })
              })
          })
      }

    })


})
module.exports = router
