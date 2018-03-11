import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

const env = process.env.NODE_ENV === 'production' ? 'https://mcmtac.herokuapp.com/' : 'localhost:3000/';
const socket = openSocket(env);

export default class Chat extends React.Component{
  
  constructor(props){
    super(props);
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
    this.state = {
      chatList: [],
      chatListGM: [],
      keyCount: 0,
      from: '',
      nextId: 0,
      text: ''
    };
  }
  
  //////////////////////////////////////////////////////////////////////////////////
  componentDidMount(){
    socket.on('newMessage', (message) => {
      this.setState({ chatList: [...this.state.chatList, {...message}], from: message.from });
    });
  }//////////////////////////////////////////////////////////////////////////////////

  ///////////updates text change//////////
  onTextChange(e){
    this.setState({text: e.target.value});
  }////////////////////////////////////////

  ////////////////////////map throw chat state////////////////////////
  renderChatList() {
    return this.state.chatList.map((chatItem) => {
      if(chatItem.to === 'Gm'){
        if(this.state.from === this.props.owner || this.props.owner === 'Gm'){
          return <li key={this.getKey()}>{chatItem.from} : {chatItem.text}</li>
        }
      }else{
        return <li key={this.getKey()}>{chatItem.from} : {chatItem.text}</li>
      }
      return null
    });
  }//***************************************
  //*************key for chat***************
  getKey(){
    return this.keyCount++;
  }//***************************************
  ///////////////////////////////////////////////////////////////////

  ////////////////////////
  clear(e) {
    e.preventDefault();
    this.setState({chatList: []})
  }///////////////////////////

  ///////////////////////////chat///////////////////////////////////////
  send(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: this.props.owner,
        text: this.state.text
    }, function(){});
    this.setState({text: ''});
  }
  //********************************
  sendToGM(e) {
    e.preventDefault();
    socket.emit('createGMMessage', {
        from: this.props.owner,
        text: this.state.text,
        to: 'Gm'
    }, function(){});
    this.setState({text: ''});
  }
  ///////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  render(){
      return (
        <div>
          <form >
            <input type="text" onChange={this.onTextChange.bind(this)} value={this.state.text} placeholder="message"/>
            <button onClick={this.send.bind(this)}>Send chat</button>
            <button className="Important" onClick={this.sendToGM.bind(this)}>Send to GM</button>
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