import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {Button, Header, Image, Label, Modal} from 'semantic-ui-react';
import '../App.css';
import logo from './../images/cmtacSign.png';
import map from './../images/map_colored.jpeg';

class App extends Component {

  callApi = async () => {
    const response = await fetch('/home');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <Header as='h1' className="App-header" size="medium">
          <div><Image src={logo} alt="logo" size='small' verticalAlign='middle'/></div>
          <div>{' '}Presented by the Mayors Cross Map Townsmanship Aficionados Club</div>
        </Header>
        <Image className="App-Map" src={map} verticalAlign='middle'/>
        <div className="To-Login"><Button basic color="olive"><h4><Link style={{color: '#4b220a'}} to="/login">To Login</Link></h4></Button></div>
        <div><Modal dimmer closeIcon trigger={<Label color="blue" className="Pointer">The story so far...</Label>}>
          <Modal.Header>Last time on Terraforma!</Modal.Header>
          <Modal.Content>
            Rychar, Tylendel, and the ever antagonistic and reluctant Wolfbane ventured into the sand village in order to get back the stolen water for the town. 
            <br />In the process they got a sandperson banished, but found out what happened to the water.
            <br />Now They are back in town, and have come across the Arcane Order, who don't look too impressed with Tylendel...
          </Modal.Content>
        </Modal></div>
      </div>
    );
  }
}

export default App;