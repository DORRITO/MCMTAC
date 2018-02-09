import React, { Component } from 'react';
import {connect} from 'react-redux';
import titleCase from 'title-case';
import getName from './../redux/actions/nameAction';
import {history} from './../routers/AppRouter';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const loginFail = 'This login or password is not registered with the MCMTAC. \n\nIf you enter at this point, a member of the arcane order may incinerate you. While some of our citizens might try a taste of a well done version of you, We like you the way you are, please register!'

class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
        login: '',
        password: '',
    };
  }

  /////////////////////////////////////////////////////
  callApi = async () => {
    const response = await fetch('/loginplayers');
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
      <div className='login-form'>
        <style>{`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h1' textAlign='center'>
            {' '}MCMTAC Login
            </Header>
            <Form size='large' onSubmit={this.onSubmit.bind(this)} noValidate>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' onChange={this.onLoginChange.bind(this)} placeholder='Username'/>
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' onChange={this.onPassChange.bind(this)} type='password'/>
                <Button color='green' fluid size='large'>Enter Terraforma!</Button>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
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
  
  export default connect(mapStateToProps)(LoginForm);