import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from './../images/cmtacSign.png';
import '../App.css';

class App extends Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/home');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3><Link to="/login">Login</Link></h3>
          <h1 className="App-title">Presented by the Mayors Cross Map Townsmanship Aficionados Club</h1>
        </header>
        <modal>The story so far</modal>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;