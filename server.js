const path = require('path');
// const publicPath = path.join(__dirname, './client/build');
const express = require('express');
const app = express();
app.use('/', express.static(`${__dirname}/client/build`));
var mongoose = require('mongoose');

var {mongoose} = require('./server/db/mongoose');
var bodyParser = require('body-parser');
const _ = require('lodash');

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const port = process.env.PORT || 8000;
// console.log(PlayersAPI ? console.log('yup'): console.log('nope'));
let {PlayersAPI} = require('./server/models/players');

app.get('/home', (req, res) => {
  res.send({ express: 'this is the home page from the back end'});
});

app.get('/login', (req, res) => {
  res.send({ express: 'backend: please enter your username and password' });
});

app.route('/players')
  .get(function (req, res)  {
    PlayersAPI.find().then((players) => {
      if(!players){return res.status(404).send()}
    
      res.send( players[0].Players );
    })
  })
  .patch(function (req, res)  {
    // let body = _.pick(req.body, ['name', 'dice']);
    // let userInfo = req.query; //query if using url string
    let name = req.body.name;
    let dice = req.body.dice;

    let diceRoll = `Players.${name}.dice`;
    let set = {}; 
    set[diceRoll] = dice; //have to do this to set variables
    // PlayersAPI.findOneAndUpdate({_id: 123 }, {$set: set}, {new: true} ).then((player) => {console.log(player)})
    // PlayersAPI.findOneAndUpdate({_id: 123 }, {$set: {"Players.GM.dice": "123"}}, {new: true} ).then((player) => {console.log(player)})
    PlayersAPI.findOneAndUpdate({_id: 123}, {$set: set}, {new: true}).then((players) => {
      if(!players){return res.status(404).send()};
      res.send( players.Players );
    }).catch((e) => { res.status(400).send()});
  })

app.listen(port, () => console.log(`Listening on port ${port}`));