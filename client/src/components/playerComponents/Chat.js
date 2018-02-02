import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

export class Chat extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      text: '',
      nextId: 0,
      chatList: []
    };
  }
  
  //////////////////////////////////////////////////////////////////////////////////
  componentDidMount(){
    // socket.on('newMessage', (message) => {this.state.chatList.push({...message}) });
    socket.on('newMessage', (message) => {
        this.setState({ chatList: [...this.state.chatList, {...message}] }) 
    });
  }//////////////////////////////////////////////////////////////////////////////////

  ///////////updates text change//////////
  onTextChange(e){
    this.setState({text: e.target.value});
  }////////////////////////////////////////

  ////////////////////////map throw chat state////////////////////////
  renderChatList() {
    return this.state.chatList.map((chatItem) => {
        return <li key={chatItem.createdAt}>{chatItem.from}: {chatItem.text}</li>
    });
  }///////////////////////////////////////////////////////////////////

  ///////////////////////////roll///////////////////////////////////////
   send(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: this.props.owner,
        text: this.state.text
    }, function(){});
  }///////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  render(){
      return (
        <div>
          <form onSubmit={this.send.bind(this)}>
            <input type="text" onChange={this.onTextChange.bind(this)} placeholder="message"/>
            <button>Send chat</button>
          </form>
          <ul>{this.renderChatList()}</ul>
        </div>
      )
  }/////////////////////////////////////////////////////////////////////////////
};

Chat.propTypes ={
    owner: PropTypes.string.isRequired
};