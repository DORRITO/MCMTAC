import React from 'react';
import {Link} from 'react-router-dom';

import LoginForm from './../ui/loginForm';

import {Button, Header} from 'semantic-ui-react';
import logo from './../images/cmtacSign.png';
import '../App.css';

const Login = () => (
  <div className="App">
    <Header className="App-header" size="medium">
      <Button color="teal" ><Link style={{color: 'black'}}  to="/">Home</Link></Button>
      <h1 className='Top-H1'>{' '}The Mayors Cross Map Townsmanship Aficionados Club welcomes you to enter Terraforma!</h1>
      <h3 className='Top-H3'>{' '}The Arcane Order is currently prohibiting most travel to the East, this portal will take you to the West.  Please enjoy!</h3>
      <h6 className='Top-H6'>{' '}The MCMTAC reminds you to please not to try to head East under the current advisory.  We don't want you incinerated!</h6>
    </Header>
    <img src={logo} className="App-logo" alt="logo" />
    <LoginForm/>
  </div>
);

export default Login;