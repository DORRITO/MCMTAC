import React, { Component } from 'react';
import {history} from './../routers/AppRouter';

import { Grid, GridColumn, Menu, Segment } from 'semantic-ui-react';

import Player from './playerComponents/Player';

  class GamePage extends Component {
    constructor(props){
      super(props);
      this.state = {};
    }

    onClick(e){
      e.preventDefault();
      history.push('/login');
    }
    ////////////////////////////////////////////////////////////////////////////////
    render() {
      return (
        <div>
          <Menu widths="9" style={{backgroundColor: '#65e69f', color: '#4b220a', height: '4rem'}} >
            <h2>Terraforma</h2>
            <div><h1 className="Header-gamepage">Presented by the Mayors Cross Map Townsmanship Aficionados Club</h1>
            <h5>(In cooperation with the arcane order)</h5></div>
            <Menu.Item header onClick={this.onClick.bind(this)}>Logout</Menu.Item>
          </Menu>
          <Grid columns='3' textAlign='center' verticalAlign="middle" className="playersSection">
            <Grid.Row>
              <GridColumn>
                <Segment raised color="orange"><Player name="Rychar" icon={["building outline", "university", "building", ["black", "orange", "orange"]]} /></Segment>
              </GridColumn>
              <GridColumn>
                <Segment raised color="yellow"><Player name="Tylendel" icon={["fort awesome", "fort awesome", "fort awesome", ["yellow", "black", "black"]]} /></Segment>
              </GridColumn>
              <GridColumn>
                <Segment raised color="orange"><Player name="Wolfbane" icon={["fire", "tree", "leaf", ['orange', 'green', 'green']]} /></Segment>
              </GridColumn>
            </Grid.Row>
            <Grid.Row style={{marginTop: '3rem'}} columns='2'>
              <GridColumn>
                <Segment style={{paddingRight: '10rem', paddingLeft: '10rem'}} raised color="green"><Player name="Gm" icon={["asl", null, null, [null, "black", null]]}/></Segment>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </div>
      );
  };////////////////////////////////////////////////////////////////////////////
}

export default GamePage;