import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';

// import incapacitate from './Incapacitate';
import Dice from './Dice';
import Chat from './Chat';
import PlayerBoxIcon from './PlayerBoxIcon';

const socket = openSocket('https://mcmtac.herokuapp.com/');

class Player extends React.Component{
  //******************
  constructor(props){
    super(props);
    this.state = {
      isChecked: false,
      modifier: 0,
      knockedOut: ''
    };
  }//*****************

  //********************************************************************
  componentDidMount(){
    socket.on('incapacitated2', (data) => {if(data.name === this.props.user){this.setState({isChecked: data.isChecked, knockedOut: data.name})} });
  }//********************************************************************

  //**********************************
  onCheckboxChange = (e) => {
      let isChecked = e.target.checked;
      let name = this.props.name;
      socket.emit('incapacitated', isChecked, name);
  }//**********************************

  //////////////////////////////////////////////////////////////////
  render(){
    return (
      <div>
        <div>
        <h2>{this.props.name}</h2>
        <PlayerBoxIcon icon={this.props.icon}/>
        </div>
        <div className="divWithbackground">
            {this.state.isChecked && this.props.user === this.state.knockedOut ? 'INCAPACITATED' : <Dice owner={this.props.name}/>}
        </div> 
        {this.props.user === 'Gm' ? <div><input type="checkbox" onChange={this.onCheckboxChange.bind(this)}></input>FINISH HIM</div> : ''}
        <Chat owner={this.props.name} user={this.props.user}/>
      </div>
    );
  }////////////////////////////////////////////////////////////////////////////
};

//////////////////////////////////////
const mapStateToProps = (state) => {
  return{
    ...state,
    user: state.user,
    authed: state.authed
  };
};/////////////////////////////////////

export default connect(mapStateToProps)(Player);

//////////////////////////////////////////////////////////////////////
Player.propTypes ={
  name: PropTypes.string.isRequired
  // icon: PropTypes.array.isRequired
};