import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import { Button, Container, Header, Menu, Segment,Linking, Form,  Rating } from "semantic-ui-react";

import "./review.css";

import MyComment from './Comment'
import MyItem from './Itemtemp'
import DataTable from "./dataTable";

class Reviews extends Component {
  constructor(props){
    super(props);
    const interst = (this.props.interestingness)/5
    const difficulty = (this.props.difficulty)/5
    const usefulness = (this.props.usefulness)/5


    this.state = {
      data : [
        {
          data:{
          interesting: interst,
          difficulty: difficulty,
          usefulness: usefulness
          },
          meta: {color:'red'}
        }
      ],
      captions:{
        interesting: 'Interesting: ' + 5*interst ,
        difficulty: 'Difficulty: ' + 5*difficulty,
        usefulness: 'Usefulness: ' + 5*usefulness
      },
      options:{
        scales: 5,
        captionMargin: 70,
        captionProps: () => ({
          className: 'caption',
          textAnchor: 'middle',
          fontSize: 30,
          fontFamily: 'Tw Cen MT'
        }),
        tag:[],
        comment:[],
        prediction:[]
      }
    }
    this.getComment = this.getComment.bind(this)
    this.getTag = this.getTag.bind(this)
  }

  componentDidMount(){
    this.getComment(this.props.cid,this.props.professor,this.props.title);
    this.getTag(this.props.cid,this.props.professor,this.props.title);
  }

  getComment = (c,p,t) => {
    fetch('http://localhost:5000/comments?cid=' + c + '&professor=' + p + '&title=' + t)
    .then(res => res.json())
    .then(res => this.setState({ comment: res.data, prediction: res.prediction }))
    
    .catch(err => console.log(err))
  }

  getTag = (cid,professor,title) => {
    fetch('http://localhost:5000/comments/tag_words?cid=' + cid + '&professor=' + professor + '&title=' + title)
    .then(res => res.json())
    .then(res => this.setState({ tag: res.tags }))

    .catch(err => console.log(err))
  }


  render() {
    console.log(this.state)
    return (
      <Container>
        <Segment inverted>
          <MyItem data = {this.state} />
        </Segment>
          <MyComment comments = {this.state.comment} />
      </Container>
    );
  }
}

export default Reviews;
