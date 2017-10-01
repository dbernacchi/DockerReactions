const express = require('express')
const router = express.Router()

const Queue = require('../models/queue')

const helpers = require('../helpers')

router.get('/', (req, res) => {
  // todo: get active events, for each get reactions, drop into queue
  let itemID = helpers.getItemIdFromURL('https://www.facebook.com/4ffrf/videos/10155842254339728/')
  new Queue({'event_id': 1}).save()
    .then(model => {
      helpers.getReactions(itemID)
      .then(reactions => {
        let aggregate = helpers.aggregateReactions(reactions)
        model.save({data: JSON.stringify(aggregate)}, {patch: true})
        res.send({
          'result': 'SUCCESS',
          'data': aggregate
        })
      })
      .catch(error => {
        console.log('wtf, mate?')
        res.send({
          'result': 'FAILURE',
          'error': error
        })
      })
    })
})
module.exports = router
