import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// import {DiceMod} from './../../api/diceMod';
// import {DiceResult} from './../../api/diceResult';

export class Dice extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      owner: this.props.owner,
      d20: '',
      players: {},
      modifier: 0,
      isGM: '',
      name: ''
    };
  }

  // componentWillMount(){
     // Meteor.setTimeout(function(){console.log('hi')}, 1000);
  // }

  componentDidMount(){
    this.callGetAPI()
      .then(res => this.setState({ name: res[this.state.owner].name }) )
      .catch(err => console.log(err))
  }

  callGetAPI = async () => {
    const response = await fetch('/players');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  callFetchAPI = async (d20) => {
    // const response = await fetch(`/players?name=${this.state.name}&dice=${d20}`, {method: 'PATCH'});
    
    const response = await fetch('/players', { 
      method: 'PATCH',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({ name: this.state.name, dice: d20}) 
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  ////////dice modifier/////////
  onModifierChange(e) {
    let modifier = e.target.value
    this.setState({modifier})
  }/////////////////////////////

  ///////////////////////////roll///////////////////////////////////////
  roll() {
    let d20 = Math.floor(Math.random() * 20 + 1) + Number(this.state.modifier)
    d20 < 1 ? d20 = 1 : d20 = d20
    
    this.callFetchAPI(d20)
      .then(res => this.setState({d20: res[this.state.owner].dice}) )
      .catch(err => console.log(err))
  }///////////////////////////////////////////////////////////////////////

//  {this.state.isGM ? <input type="number" placeholder={0} onChange={this.onModifierChange.bind(this)} value={this.state.modifier}/> : 'change this later to gm, not me'}

  //////////////////////////////////////////////////////////////////////////////
  render(){
      return (
        <div>
          <button onClick={this.roll.bind(this)}>Roll +{this.state.modifier}</button>
          {this.state.d20}{this.state.name}
          <input type="number" placeholder={0} onChange={this.onModifierChange.bind(this)} value={this.state.modifier}/>
        </div>
      )
  }/////////////////////////////////////////////////////////////////////////////
};

Dice.propTypes ={
  owner: PropTypes.string.isRequired
};