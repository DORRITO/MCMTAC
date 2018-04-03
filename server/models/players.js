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
            race: 'Half elf',
            class: 'Fighter',
            profession: 'Thief, Politician',
            stats: {
                str: '8 + 1', skill: '6 + 1',
                dex: '11 + 3', char: '8 + 3',
                const: '11 + 2', int: '9',
                wis: '8'
            },
            affiliation: 'Mayors cross map townsmanship aficionados club!',
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
            race: 'Half elf / Half Sea-Dweller',
            class: 'Mage',
            profession: 'Arcane-order',
            stats: {
                str: '11', skill: '8 + 2',
                dex: '11', char: '6 + 2',
                const: '10', int: '9 + 3',
                wis: '7 + 3'
            },
            affiliation: 'Arcane order',
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
            race: 'Elf',
            class: 'Hunter',
            profession: 'Scout, spy',
            stats: {
                str: '', skill: '',
                dex: '', char: '',
                const: '', int: '',
                wis: ''
            },
            affiliation: 'None',
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