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
        <div className="To-Login">
          <Link to="/login"><Button basic color="olive" style={{color: '#4b220a'}}><h4>To Login</h4></Button></Link>
        </div>
        <div><Modal dimmer closeIcon trigger={<Label color="blue" className="Pointer">The story so far...</Label>}>
          <Modal.Header>Last time on Terraforma!</Modal.Header>
          <Modal.Content>
            Rychar, Tylendel, and the ever antagonistic  Wolfbane retrieved the water to save the town after rescuing the sand orca pup. 
            <br />The Arcane order under the charge of Tylendel is still in control of the town, and is making safeguards around the well
            <br />as Tylendel requested. Tylendel is exhausted from using his newfound abilities, but Rychar may have a surprise in store for him...
          </Modal.Content>
        </Modal></div>
      </div>
    );
  }
}

export default App;