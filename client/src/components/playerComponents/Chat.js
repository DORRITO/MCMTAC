import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

const  socket = openSocket('https://blooming-dawn-99864.herokuapp.com/');

export default class Chat extends React.Component{
  
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

  ////////////////////////
  clear(e) {
    e.preventDefault();
    this.setState({chatList: []})
  }///////////////////////////

  ///////////////////////////roll///////////////////////////////////////
   send(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: this.props.owner,
        text: this.state.text
    }, function(){});
    this.setState({text: ''});
  }///////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  render(){
      return (
        <div>
          <form onSubmit={this.send.bind(this)}>
            <input type="text" onChange={this.onTextChange.bind(this)} value={this.state.text} placeholder="message"/>
            <button>Send chat</button>
            <button onClick={this.clear.bind(this)}>Clear Chat</button>
          </form>
          <ul>{this.renderChatList()}</ul>
        </div>
      )
  }/////////////////////////////////////////////////////////////////////////////
};

Chat.propTypes ={
    owner: PropTypes.string.isRequired
};