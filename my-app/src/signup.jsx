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
  state = {
    userid: '',
    password: '',
  }
  onChange = (key, value) => {
    this.setState({ [key]: value })
  }
  render() {
    return (
      <div className="Signup">
        <Grid textAlign="center">
          <Container className="login">
            <Header inverted as="h2">Create your account</Header>
            <Form size="large">
              <Form.Input
                name="userid"
                placeholder="User Id"
                type="text"
                onChange={evt => this.onChange('userid', evt.target.value)}
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
                onChange={evt => this.onChange('password', evt.target.value)}
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
