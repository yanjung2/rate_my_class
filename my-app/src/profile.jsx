import React, { Component } from "react";
import { render } from "react-dom";
import { Input } from "semantic-ui-react";
import ProfileTable from "./profileTable";
import { connect } from 'react-redux';

class Profile extends Component {
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

const mapStateToProps = (state) => {
  return{
    ustate: state.ustate
  }
}
export default connect(mapStateToProps)(Profile)
