import React, { Component } from "react";

import { Table } from 'semantic-ui-react'
import { Button, Modal} from 'semantic-ui-react'
import Ratings from "./rating"
import Reviews from "./review"
import { connect } from 'react-redux';


class DataTable extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    console.log(this.props.ustate.uid);
  }
  rateModalWindow = (c,p,t) => (
    <Modal trigger={<Button basic inverted color='red'>Rate</Button>}>
      <Modal.Header>Rate the class</Modal.Header>
      <Modal.Content>
        <Ratings cid={c} professor={p} title={t}/>
      </Modal.Content>
    </Modal>
  )

  newModalWindow = (c,p,t, g, d, i ,u) => (
    <Modal trigger={<Button inverted color='brown'>Reviews</Button>}>
      <Modal.Header>Reviews</Modal.Header>
      <Modal.Content>
        <Reviews cid={c} professor={p} title={t} GPA = {g} difficulty = {d} interestingness = {i} usefulness = {u}/>
      </Modal.Content>
    </Modal>
  )
  handleEmpty =(
    <Button inverted color='grey'>Rate</Button>
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
        {this.newModalWindow(obj.cid, obj.professor, obj.title, obj.GPA, obj.diff, obj.interst, obj.useful)}
      </Table.Cell>
      <Table.Cell>
        { this.props.ustate.iflog? this.rateModalWindow(obj.cid, obj.professor, obj.title) : this.handleEmpty}
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
            <Table.HeaderCell>Reviews</Table.HeaderCell>
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

const mapStateToProps = (state) => {
  return{
    ustate: state.ustate
  }
}

export default connect(mapStateToProps)(DataTable)
