const axios = require('axios')

const Queue = require('./models/queue')
const Event = require('./models/event')

const accessToken = '350787432040190|2tcZ-CcIcjvAjRn34FrmCgE1Yuw'
const reactionTypes = ['NONE', 'LIKE', 'LOVE', 'WOW', 'HAHA', 'SAD', 'ANGRY', 'THANKFUL', 'PRIDE']

helpers = {
  test: function() {
    return 'go!'
  },
  getLiveEvents: function() {
    return new Event({'live': 1}).fetchAll()
  },
  processEvents: function(eventsCollection) {
    // TODO return a promise

  },
  getItemIdFromURL: function(url) {
    // example https://www.facebook.com/4ffrf/videos/10155842254339728/
    let test = url.split('/')
    // test for URLs without trailing slash and return ID portion of path
    return (test[test.length -1] !== '') ? test[test.length - 1] : test[test.length - 2]
  },
  aggregateReactions: function(reactions) {
    let aggregate = {}
    // iniitalize data
    for (let i = 0; i < reactionTypes.length; i++) {
      aggregate[reactionTypes[i]] = 0
    }
    for(let i = 0; i < reactions.length; i++) {
      aggregate[reactions[i].type]++
    }
    return aggregate
  },
  fixAccessTokenInURL: function(url) {
    return url.replace(/\u00257C/,"|")
  },
  getReactions: function(itemID) {
    let reactions = []
    let starterUrl = 'https://graph.facebook.com/v2.10/' + itemID + '/reactions?access_token=' + accessToken + '&limit=10'
    const getReactionsPage = url => axios.get(url)
      .then(response => {
        reactions = reactions.concat(response.data.data)
        if(response.data['paging']['next']) {
          return getReactionsPage(response.data.paging.next)
        } else {
          return reactions
        }
      })
      .catch(error => {
        reject(error)
      })
    return getReactionsPage(starterUrl)
  }
}

module.exports = helpers
