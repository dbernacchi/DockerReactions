const express = require('express')
const router = express.Router()

const Event = require('../models/event')
const Log = require('../models/log')

const helpers = require('../helpers')

router.get('/:id/:startTime/:endTime', (req, res) => {
  new Log({event_id: req.params.id})
    .where('ts', '>=', req.params.startTime)
    .where('ts', '<=', req.params.endTime)
    .fetchAll()
    .then(logs => {
      res.send({
        logs: logs.models
      })
    })
})

router.get('/', (req, res) => {
  helpers.getLiveEvents()
    .then(events => {
      res.send({
        'result': 'SUCCESS',
        'events': events.models
      })
    })
    .catch(errors => {
      console.log('wtf',errors)
      res.send({
        'result': 'FAILURE',
        'errors': errors
      })
    })
})

module.exports = router
