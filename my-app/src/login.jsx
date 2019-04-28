import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import { connect } from 'react-redux'

import {
  Button,
  Checkbox,
  Container,
  Form,
  Grid,
  Header,
  Message
} from "semantic-ui-react";

import "./App.css";
import "./login.css"
import "./signup.jsx"

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  getLogin = (uid,password) => {
    fetch('http://localhost:5000/login?uid=' + uid + '&password=' + password)
    .then(res => res.json())
    .then(
          res => {console.log(res);
            if(res["success"] == 1){
                      this.props.loggingin(this.state.username)
                      this.props.history.push('/')
                    }
                  else
                      alert("User Not Exists or Wrong Password/Username")
                    })
    .catch(err => console.log(err))
  }


  handleSubmit = (e) =>{
    console.log(this.state.username)
    console.log(this.state.password)
    this.getLogin(this.state.username, this.state.password)

  }
  render() {
    return (
      <div className="Login">
        <Grid textAlign="center">
          <Container className="login">
            <Form size="large" onSubmit = {this.handleSubmit}>
              <Form.Input
                name="email"
                placeholder="Email address"
                type="text"
                onChange = {(e) => this.setState({username:e.target.value})}
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
                onChange = {(e) => this.setState({password:e.target.value})}
              />

              <Button secondary fluid size="large" type="submit">
                Sign in
              </Button>
            </Form>
              <Header inverted as="h5">
                New to us? Please <a href="/Signup"> Sign Up</a>
              </Header>
          </Container>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    ustate: state.ustate
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    loggingin: (uid) => {dispatch({type : 'LOG_IN', id : uid})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
