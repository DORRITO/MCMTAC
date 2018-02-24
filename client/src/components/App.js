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
            Rychar, Tylendel, and the ever antagonistic and reluctant Wolfbane ventured towards the dunes to the northwest of the town. 
            <br />The Arcane order took over the town, and Tylendel was placed in charge of the group, leading the way to the well
            <br />so that they could return water and save the town...
          </Modal.Content>
        </Modal></div>
      </div>
    );
  }
}

export default App;