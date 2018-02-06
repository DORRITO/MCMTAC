import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Dice from './Dice';
import Chat from './Chat';
import PlayerBoxIcon from './PlayerBoxIcon';

class Player extends React.Component{
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
        {this.props.user === 'Gm' ? <div><input type="checkbox" onChange={this.onCheckboxChange.bind(this)}></input>FINISH HIM</div> : ''}
        {this.props.name === this.props.user || this.props.user === 'Gm' ? <Chat owner={this.props.name}/> : ''}
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
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
  // roll: PropTypes.func.isRequired
};