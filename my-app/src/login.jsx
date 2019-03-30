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

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Grid textAlign="center">
          <Container>
            <Header inverted as="h1">Account</Header>
            <Form size="large">
              <Form.Input
                name="email"
                placeholder="Email address"
                type="text"
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
              />

              <Button secondary fluid size="large" type="submit">
                Sign in
              </Button>
            </Form>
              <Header inverted as="h5">
                New to us? Please <a href="#root"> Sign Up</a>
              </Header>
          </Container>
        </Grid>
      </div>
    );
  }
}
