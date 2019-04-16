import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

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

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  render() {
    return (
      <div className="Login">
        <Grid textAlign="center">
          <Container className="login">
            <Form size="large">
              <Form.Input
                name="email"
                placeholder="Email address"
                type="text"
                onChange = {(event,newValue) => this.setState({username:newValue})}
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
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
