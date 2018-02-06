import React, { Component } from 'react';
import titleCase from 'title-case';
import getName from './../redux/actions/nameAction';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {history} from './../routers/AppRouter';

import logo from './../images/cmtacSign.png';
import '../App.css';

const loginFail = 'This login or password is not registered with the MCMTAC. \n\nIf you enter at this point, a member of the arcane order may incinerate you. While some of our citizens might try a taste of a well done version of you, We like you the way you are, please register!'

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  // componentDidMount() {
  //   console.log(this.props.user, this.props.authed)
  // }

  /////////////////////////////////////////////////////
  callApi = async () => {
    const response = await fetch('/login');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };//////////////////////////////////////////////////////

  ///////////updates text change//////////
  onLoginChange(e){
    let login = e.target.value.trim().toLowerCase()
    this.setState({login});
  }////////////////////////////////////////

  ///////////updates text change//////////
  onPassChange(e){
    let password = e.target.value.trim().toLowerCase()
    this.setState({password});
  }////////////////////////////////////////

  ///////////updates text change//////////
  onSubmit(e){
    e.preventDefault();
    let capLogin = titleCase(this.state.login);
    let lowerPass = this.state.password.toLowerCase();
    
    this.callApi()
      .then(res => { 
        if(res[capLogin].password === lowerPass){
          this.props.dispatch(getName({ name: capLogin, auth: true }));
          history.push('/gamepage')
        }else{alert(loginFail)}
      })
      .catch(err => alert(loginFail));
  }////////////////////////////////////////

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
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                <input type="text" onChange={this.onLoginChange.bind(this)} value={this.state.login} placeholder="username" />
                <input type="password" onChange={this.onPassChange.bind(this)} value={this.state.password} placeholder="password" />
                <button className="button">Enter Terraria!</button>
            </form>
          </div>
        </div>

        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}
//////////////////////////////////////
const mapStateToProps = (state) => {
  return{
    ...state,
    user: state.user,
    authed: state.authed
  };
};/////////////////////////////////////

export default connect(mapStateToProps)(Login);