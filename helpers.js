helpers = {
    fixAccessTokenInURL:function(url) {
        return url.replace(/\u00257C/,"|")
    }
}
  
module.exports = helpers