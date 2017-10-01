const axios = require('axios')
const accessToken = '350787432040190|2tcZ-CcIcjvAjRn34FrmCgE1Yuw'
helpers = {
  test: function() {
    return 'go!'
  },
  fixAccessTokenInURL:function(url) {
    return url.replace(/\u00257C/,"|")
  },
  getReactions:function(itemID) {
    console.log('starting getReactions')
    let reactions = []
    let starterUrl = 'https://graph.facebook.com/v2.10/' + itemID + '/reactions?access_token=' + accessToken + '&limit=10'
    const getReactionsPage = url => axios.get(url)
      .then(response => {
        console.log('successful request', response)
        reactions = reactions.concat(response.data.data)
        if(response.data['paging']['next']) {
          return getReactionsPage(response.data.paging.next)
        } else {
          return reactions
        }
      })
      .catch(error => {
        console.log('unsuccessful request', error)
        reject(error)
      })
    console.log('starting recursion')

    return getReactionsPage(starterUrl)
  }
}

module.exports = helpers
