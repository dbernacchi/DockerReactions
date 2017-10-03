const express        = require('express')
const bodyParser     = require('body-parser')
const cors           = require('cors')

const app            = express()

const fetch            = require('./routes/fetch')
const events            = require('./routes/events')

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const port = 7000

app.use('/fetch', fetch);
app.use('/events', events);

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, _next) {
    console.log(req.headers)
    console.log('Error handler', err)
    res.status(err.status || 500);
    res.send({'query': req.query, 'result': err, 'message': 'You shall not pass!'})
  })
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, _next) {
  //console.log('Error handler', err);
  res.status(err.status || 500);
  res.send({'query': req.query, 'result': err, 'message': 'You shall not pass!'})
});

app.listen(port, () => {
  console.log('We are live on ' + port)
});
