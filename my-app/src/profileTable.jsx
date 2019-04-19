import React, { Component } from "react";

import { Table, Menu} from 'semantic-ui-react'
import { Button, Modal, Grid} from 'semantic-ui-react'
import Rating from "./rating"


export default class ProfileTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.getStat = this.getStat.bind(this);
  }

  getStat = _ => {
   console.log("ok")
   fetch('http://localhost:5000/comments/profile?uid=zhesong2')
    .then(res => res.json())
    .then(res => this.setState({ data: res.data }))
    .then(res => console.log(this.state.data))
    .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getStat();
  }v

  handleDelete = (e,c,p,t) => {
    console.log('http://localhost:5000/comments/delete?cid=' + c + '&professor=' + p + '&title=`' + t + '`&uid=zhesong2')
    fetch('http://localhost:5000/comments/delete?cid=' + c + '&professor=' + p + '&title=' + t + '&uid=zhesong2')
    .then(res => res.json)
    .then(res => alert("The rating has been deleted"))
    .then(res => this.getStat)
    .then(res => window.location.reload())
    .catch(err => console.log(err))
  }
  rateModalWindow = (c,p,t) => (
    <Modal trigger={<Button>Edit</Button>}>
      <Modal.Header>
      <Grid columns={2} divided>
        <Grid.Column textAlign='left'>
          Edit the rating
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button negative onClick = {(e) => this.handleDelete(e,c,p,t)}>Delete</Button>
        </Grid.Column>
      </Grid>
      </Modal.Header>
      <Modal.Content>
      <Rating cid={c} professor={p} title={t} />
      </Modal.Content>
    </Modal>
  )

  handleMapClasses = (obj) => (
    <Table.Row>
      <Table.Cell>{obj.cid}</Table.Cell>
      <Table.Cell>{obj.professor}</Table.Cell>
      <Table.Cell>{obj.title}</Table.Cell>
      <Table.Cell>{obj.diff}</Table.Cell>
      <Table.Cell>{obj.interst}</Table.Cell>
      <Table.Cell>{obj.useful}</Table.Cell>
      <Table.Cell>
        {this.rateModalWindow(obj.cid, obj.professor, obj.title)}
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
            <Table.HeaderCell>Difficulty</Table.HeaderCell>
            <Table.HeaderCell>Interestingness</Table.HeaderCell>
            <Table.HeaderCell>Usefulness</Table.HeaderCell>
            <Table.HeaderCell>Rate</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data.map(this.handleMapClasses)}
        </Table.Body>
      </Table>
    );
  }
}
