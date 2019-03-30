import React, { Component } from "react";

import { Table } from 'semantic-ui-react'
import { Button, Modal} from 'semantic-ui-react'
import Ratings from "./rating"


export default class DataTable extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidUpdate(){
    console.log(this.props.arr);
  }
  newModalWindow = (c,p,t) => (
    <Modal trigger={<Button basic inverted color='red'>Rate</Button>}>
      <Modal.Header>Rate the class</Modal.Header>
      <Modal.Content>
        <Ratings cid={c} professor={p} title={t}/>
      </Modal.Content>
    </Modal>
  )

  handleMapClasses = (obj) => (
    <Table.Row>
      <Table.Cell>{obj.cid}</Table.Cell>
      <Table.Cell>{obj.professor}</Table.Cell>
      <Table.Cell>{obj.title}</Table.Cell>
      <Table.Cell>{obj.GPA}</Table.Cell>
      <Table.Cell>{obj.diff}</Table.Cell>
      <Table.Cell>{obj.interst}</Table.Cell>
      <Table.Cell>{obj.useful}</Table.Cell>
      <Table.Cell>
        {this.newModalWindow(obj.cid, obj.professor, obj.title)}
      </Table.Cell>

    </Table.Row>
  )
  render() {
    const resRender = ({ cid, professor }) => (
      <span key="name">
        CS {cid} {professor}
      </span>
    );
    return (
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cid</Table.HeaderCell>
            <Table.HeaderCell>Prof</Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>GPA</Table.HeaderCell>
            <Table.HeaderCell>Difficulty</Table.HeaderCell>
            <Table.HeaderCell>Interestingness</Table.HeaderCell>
            <Table.HeaderCell>Usefulness</Table.HeaderCell>
            <Table.HeaderCell>Rate</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.arr.map(this.handleMapClasses)}
        </Table.Body>
      </Table>
    );
  }
}
