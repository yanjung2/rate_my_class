import React, { Component } from "react";
import { render } from "react-dom";
import { Input } from "semantic-ui-react";
import DataTable from "./dataTable";

export default class Stats extends Component {
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
        <DataTable arr={this.state.data}/>
      </React.Fragment>
    );
  }
}
