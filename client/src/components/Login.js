import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from './../images/cmtacSign.png';
import '../App.css';

class Login extends Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/login');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3><Link to="/">Home</Link></h3>
          <h1 className="App-title">The Mayors Cross Map Townsmanship Aficionados Club welcomes you to enter Terraria!</h1>
        </header>

        <div className="boxed-view" >
          <div className="boxed_view__box">
            <h1>MCMTAC Login</h1>
            <form className="boxed-view__form" noValidate>
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
                <button className="button"><Link to="/gamepage">Enter Terraria!</Link></button>
            </form>
          </div>
        </div>

        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default Login;