const express = require('express');
const router = express.Router()
const helpers = require('../helpers')
// https://www.facebook.com/4ffrf/videos/10155842254339728/
router.get('/', (req, res) => {
  helpers.getReactions(10155842254339728)
    .then(reactions => {
      res.send({
        'result': 'SUCCESS',
        'data': reactions
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
module.exports = router
