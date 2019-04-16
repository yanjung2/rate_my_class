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
  render() {
    return (
      <div className="Signup">
        <Grid textAlign="center">
          <Container className="login">
            <Header inverted as="h2">Create your account</Header>
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
