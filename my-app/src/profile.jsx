import React, { Component } from "react";
import { render } from "react-dom";
import { Input } from "semantic-ui-react";
import ProfileTable from "./profileTable";

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
  }


  render() {
    return (
      <React.Fragment>
        <ProfileTable/>
      </React.Fragment>
    );
  }
}
