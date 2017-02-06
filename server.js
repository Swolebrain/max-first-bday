const express = require('express');
const app = express();
const PORT = 8998;
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/max-first-bday');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection open');
});

var guestSchema = mongoose.Schema({
  name: String,
  numchildren: Number,
  numAdults: Number,
  attending: Boolean
});
const Guest = mongoose.model('Guest', guestSchema);


app.use(bodyParser.json());
app.use(express.static('static'))

app.post('/rsvp', function(req,res){
  if (!req.body || !req.body.name || (!req.body.numChildren && !req.body.numAdults) ){
    return res.sendStatus(400);
  }
  new Guest(req.body).save()
    .then(dbRes=>res.json(dbRes))
    .catch(err=>res.status(500).send(JSON.stringify(err)));
});

app.get('/guests', function(req,res){
  Guest.find()
    .then(dbRes=>res.json(dbRes))
    .catch(err=>res.status(500).send(JSON.stringify(err)));
});

app.listen(PORT,()=>console.log('server listening on port '+PORT));
