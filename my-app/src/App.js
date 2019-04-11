import React, { Component } from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom"
import {BrowserHistory} from 'react-router'

import "semantic-ui-css/semantic.min.css";

import { Button, Container, Header, Menu, Segment,Linking} from "semantic-ui-react";

import "./App.css";

import SearchBar from "./search"
import Login from "./login"
import Ratings from "./rating"
import Signup from "./signup"
import Navbar from "./navbar"
import DataTable from "./dataTable"
import Stats from "./stats"
import Profile from "./profile"




class App extends Component {

  handleClick = (e) => {
    this.props.handleFilter(e.target.value);
}

  render() {
    return (
      <div className="App">

        <Segment inverted vertical textAlign="center">
          <Container as="nav">
            <Header inverted as="h2">
              RateMyClass
            </Header>
            <Router>
              <div>
                <Menu borderless compact inverted>
                  <Menu.Item className="Home" value="Home" href="/">Home</Menu.Item>
                  <Menu.Item className="Stats" value="Stats" href="/Stats">Stats</Menu.Item>
                  <Menu.Item className="Profile" value="Profile" href="/Profile">Profile</Menu.Item>

                  </Menu>
              </div>
            </Router>
          </Container>
          <Container className="content">
          <Header inverted as="h1">Rate My Class</Header>
            <p>
              Find the CS class rating here and rate for your fav classes!
            </p>
          <Router>
            <Route path="/" exact component={SearchBar}/>
            <Route path="/Stats" exact component={Stats}/>

            <Route path="/Profile" exact component={Profile}/>
          </Router>
            <Segment inverted vertical as="footer">
              UIUC course explorer <a href="https://courses.illinois.edu/">Course-Explorer</a>,
              check for CS courses{" "}
              <a href="https://cs.illinois.edu/academics/courses">
                CS@UIUC
              </a>
            </Segment>
          </Container>


        </Segment>
      </div>
    );
  }
}

export default App;
