const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {mongoose} = require('./server/db/mongoose');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const port = process.env.PORT || 8000;
app.use(express.static(`${__dirname}/client/build`));

const {diceSocket, modifierSocket} = require('./server/utils/diceSocket');
const {generateMessage} = require('./server/utils/message');
let {PlayersAPI} = require('./server/models/players');

/////////////////////////////////socket messages////////////////////////////////////////////
io.on('connection', (socket) => {
  socket.emit('newMessage', generateMessage('AO Admin', 'The MCMTAC welcomes you to chat.'));

  socket.on('incapacitated', (isChecked, name) => {
    io.emit('incapacitated2', {isChecked, name})
  });

  socket.on('modifier1', (name, mod) => {
    io.emit('modifier2', modifierSocket(name, mod) )
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
      callback('this is from the server');
  })

  // app.get('/home', (req, res) => {
  //   res.send({ express: 'this is the home page from the back end'});
  // });

  app.get('/login', (req, res) => {
    PlayersAPI.find().then((players) => {
      if(!players){return res.status(404).send()}
      res.send( players[0].Players );
    })
  });

  //////////////////////////////////routes///////////////////////////////////////////////////////
  app.route('/gamepage')
    .get(function (req, res)  {
      PlayersAPI.find().then((players) => {
        if(!players){return res.status(404).send()}
      
        res.send( players[0].Players );
      })
    })
    .patch(function (req, res)  {
      // let userInfo = req.query; //query if using url string
      let name = req.body.name;
      let dice = req.body.dice;

      io.emit('dice', diceSocket(name, dice));

      let diceRoll = `Players.${name}.dice`;
      let set = {}; 
      set[diceRoll] = dice; //have to do this to set variables

      // PlayersAPI.findOneAndUpdate({_id: 123 }, {$set: set}, {new: true} ).then((player) => {console.log(player)})
      // PlayersAPI.findOneAndUpdate({_id: 123 }, {$set: {"Players.GM.dice": "123"}}, {new: true} ).then((player) => {console.log(player)})
      PlayersAPI.findOneAndUpdate({_id: 123}, {$set: set}, {new: true}).then((players) => {
        if(!players){return res.status(404).send()};
        res.send( players.Players );
      }).catch((e) => { res.status(400).send()});

    });////////////////////////////end routes/////////////////////////////////////////////////
});/////////////////////////////////////////////////////////////////////////////////////////////

server.listen(port, () => console.log(`Listening on port ${port}`));