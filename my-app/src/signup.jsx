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

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      uid: '',
      password: '',
  }
  this.getSignup = this.getSignup.bind(this);
  }

  handleSignup = (e) => {
    this.getSignup(this.state.uid, this.state.password);
  }

  getSignup = (uid,password) => {
    fetch('http://localhost:5000/signup?uid=' + uid + '&password=' + password)
    .then(res => res.json())
    .then(res => {if(res["success"] == 1)
                      alert("Congrats! You've successfully signed up!")
                  else
                      alert("UserID already exists")
                    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="Signup">
        <Grid textAlign="center">
          <Container className="login">
            <Header inverted as="h2">Create your account</Header>
            <Form size="large">
              <Form.Input
                name="uid"
                placeholder="User Id"
                type="text"
                onChange = {(e)=>{this.setState({uid:e.target.value})}}
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
                onChange = {(e)=>{this.setState({password:e.target.value})}}

              />

              <Button secondary fluid size="large"  onClick= {this.handleSignup} type="submit">
                Sign up
              </Button>
            </Form>
            <Header inverted as="h5">
              Already have an account? Please<a href="/Login"> Login </a>
            </Header>
          </Container>
        </Grid>
      </div>
    );
  }
}
