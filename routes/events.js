const express = require('express')
const router = express.Router()

const Event = require('../models/event')

const helpers = require('../helpers')

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
