import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import { Form, TextArea } from 'semantic-ui-react';
import { ChatFeed } from 'react-bell-chat';

const env = process.env.NODE_ENV === 'production' ? 'https://mcmtac.herokuapp.com/' : 'localhost:3000/';
const socket = openSocket(env);

export default class Chat extends React.Component{
  
  constructor(props){
    super(props);
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
    this.state = {
      chatList: [],
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
        if(chatItem.from === this.props.owner || this.props.owner === 'Gm'){
          return <li key={this.getKey()}><h4 className="Special">*{chatItem.from}*</h4> : {chatItem.text}</li>;
        }
      }else{
        return <li key={this.getKey()}>{chatItem.from} : {chatItem.text}</li>;
      }
      return null;
    });
  }
  //*************key for chat***************
  getKey(){
    return this.keyCount++;
  }
  ///////////////////////////////////////////////////////////////////

  ///////clear after send///////////
  clear(e) {
    e.preventDefault();
    this.setState({chatList: []})
  }////////////////////////////////

  ///////////////////////////chat///////////////////////////////////////
  send(e) {
    e.preventDefault();
    if(this.state.text){
      socket.emit('createMessage', {
        from: this.props.owner,
        text: this.state.text
      }, function(){});
      this.setState({text: ''});
    }
  }
  //********************************
  sendToGM(e) {
    e.preventDefault();
    
    if(this.state.text){
      socket.emit('createGMMessage', {
        from: this.props.owner,
        text: this.state.text,
        to: 'Gm'
      }, function(){});
      this.setState({text: ''});
    }
  }
  ///////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  render(){
      return (
        <div>
          <form >
            {this.props.owner === this.props.user || this.props.user === 'Gm' ? <input type="text" onChange={this.onTextChange.bind(this)} value={this.state.text} placeholder="message"/> : ''}
            {this.props.owner === this.props.user || this.props.user === 'Gm' ? <button onClick={this.send.bind(this)}>Send chat</button> : ''}
            {this.props.owner === this.props.user || this.props.user === 'Gm' ? <button className="Important" onClick={this.sendToGM.bind(this)}>Send to GM</button> : ''}
            {this.props.owner === this.props.user || this.props.user === 'Gm' ? <button onClick={this.clear.bind(this)}>Clear Chat</button> : ''}
          </form>
          {this.props.owner === this.props.user ? <ChatFeed><ul>{this.renderChatList()}</ul></ChatFeed> : ''}
        </div>
      )
  }/////////////////////////////////////////////////////////////////////////////
};

Chat.propTypes ={
    owner: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};