import React, { Component } from "react";
import { render } from "react-dom";
import { Input } from "semantic-ui-react";
import DataTable from "./dataTable";
import { connect } from 'react-redux'

class Stats extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
    this.getStat = this.getStat.bind(this);
  }
  componentWillMount(){
    this.getStat();
  }
  getStat = _ => {
   fetch('http://localhost:5000/stat')
    .then(res => res.json())
    .then(res => this.setState({ data: res.data }))
    .catch(err => console.log(err))
  }


  render() {
    return (
      <React.Fragment>
        <DataTable arr={this.state.data} ustate = {this.props.ustate}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    ustate: state.ustate
  }
}

export default connect(mapStateToProps)(Stats)
