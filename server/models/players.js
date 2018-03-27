let mongoose = require('mongoose');

let PlayersAPI = mongoose.model('Players', {
    _id : String,
    Players: {
      type: Object,
      required: true,
    }
});
  
let newPlayers = new PlayersAPI({
    _id: 123,
    Players: {
        Rychar:{
            name: 'Rychar',
            race: '',
            dice: '',
            login: 'rychar',
            password: 'ricroll',
            loggedIn: false,
            inventory: {
                weapon: 'sword'
            },
            skills: {
                abilities: ['bluff', 'pickpocket']
            }
        },
        Tylendel: {
            name: 'Tylendel',
            race: '',
            dice: '',
            login: 'tylendel',
            password: 'fishface6',
            loggedIn: false,
            inventory: {
                weapon: 'sword'
            },
            skills: {
                abilities: ['healing', 'magic sensitivity']
            }
        },
        Wolfbane: {
            name: 'Wolfbane',
            race: '',
            dice: '',
            login: 'wolfbane',
            password: 'reygan',
            loggedIn: false,
            inventory: {
                weapon: 'sword'
            },
            skills: {
                abilities: ['Acrobatic', 'multilingual']
            }
        }, 
        Gm : {
            name: 'Gm',
            dice: '',
            login: 'gm',
            password: 'me123',
            loggedIn: false
        }    
    }
});

newPlayers.save().then((doc) => {
    console.log('saved players', doc)
}, (e) => {
    console.log('unable to save players')
});

module.exports = {PlayersAPI};