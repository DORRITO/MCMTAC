import React from 'react';
import PropTypes from 'prop-types';

import {Dice} from './Dice';
import onCheckboxChange from './DisablePlayer';
import PlayerBoxIcon from './PlayerBoxIcon';

export class Player extends React.Component{
  //******************
  constructor(props){
    super(props);
    this.state = {
      d20: '',
      isChecked: false,
      modifier: 0
    };
  }//*****************

    //**********************************
    onCheckboxChange = (e) => {
        let isChecked = e.target.checked
        this.setState({isChecked})
    }//**********************************

  //////////////////////////////////////////////////////////////////
  render(){
    return (
      <div>
        <PlayerBoxIcon icon={this.props.icon}/>
        <div className="divWithbackground">
            <h5>{this.props.name}</h5>
            {!this.state.isChecked ? <Dice owner={this.props.name}/> : 'INCAPACITATED'}
        </div> 
        <input type="checkbox" onChange={this.onCheckboxChange.bind(this)}></input>FINISH HIM
      </div>
    );
  }////////////////////////////////////////////////////////////////////////////
};
//////////////////////////////////////////////////////////////////////
Player.propTypes ={
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
  // roll: PropTypes.func.isRequired
};