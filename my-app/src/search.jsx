import React, { Component } from "react";
import { render } from "react-dom";
import { Input } from "semantic-ui-react";
import DataTable from "./dataTable";

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getSearch = (cid) => {
   fetch('http://localhost:5000/stat/search?cid=' + cid)
    .then(res => res.json())
    .then(res => this.setState({ data: res.data }))
    .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.getSearch(e.target.value);
  }

  render() {
    return (
      <React.Fragment>
      <Input onChange = {this.handleChange}
             label='CS'
             iconPosition='left'
             placeholder='e.g 411'
      />
      {this.state.data.length ? <DataTable arr={this.state.data}/> : <React.Fragment></React.Fragment>}
      </React.Fragment>
    );
  }
}
