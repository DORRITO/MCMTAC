import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';

// import incapacitate from './Incapacitate';
import Dice from './Dice';
import Chat from './Chat';
import PlayerBoxIcon from './PlayerBoxIcon';

const env = process.env.NODE_ENV === 'production' ? 'https://mcmtac.herokuapp.com/' : 'localhost:3000/';
const socket = openSocket(env);

class Player extends React.Component{
  //******************
  constructor(props){
    super(props);
    this.state = {
      isChecked: false,
      modifier: 0,
      knockedOut: null,
      info: {}
    };
  }//*****************

  //********************************************************************
  componentDidMount(){
    //check if incapacitated is checked.  knocked out is set to null through ternary if it is unchecked
    socket.on('incapacitated2', (data) => {
      this.setState({isChecked: data.isChecked, knockedOut: this.state.isChecked ? null : data.name}) 
    });
  }//********************************************************************

  //**********************************
  onCheckboxChange = (e) => {
      let isChecked = e.target.checked;
      let name = this.props.name;
      socket.emit('incapacitated', isChecked, name);
  }//**********************************

  //**********************************
  infoClick = async () => {
    const response = await fetch('/info');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    this.setState({ info: body[this.props.user] });
    console.log(this.state.info)
    //alert(this.state.info)//delete this later
    alert('The AO prevents you from seeing this....because...it is in progress. Uh... Begone!')
    // return body;
  }//**********************************

  //////////////////////////////////////////////////////////////////
  render(){
    return (
      <div>
        <div>
          <h2 className="Inline-Title">{this.props.name}</h2><button className="Inline-Title" onClick={this.infoClick.bind()}>Info</button>
          <PlayerBoxIcon icon={this.props.icon}/>
        </div>
        <div className="divWithbackground">
            {this.props.name === this.state.knockedOut ? <h2>'INCAPACITATED'</h2> : <Dice owner={this.props.name}/>}
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
};