const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    middlewares = require('./middlewares')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(middlewares)
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});



app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  res.send(ip)
})