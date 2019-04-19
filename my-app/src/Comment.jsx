import React from 'react'
import { Comment, Segment } from 'semantic-ui-react'

const MyComment = (props) => {
    const author = props.author
    const content = props.content
    const time = props.time
    return(
    <Segment className = "Comments" >
    <Comment>
      <Comment.Content>
        <h3 className = "CommentAuthor">{author}</h3>
        <Comment.Metadata className = "Commentmeta">
          <h5 className = "postTime">Post Time:{ time }</h5>
        </Comment.Metadata >
        <Comment.Text className = "ClassContent">
          <h2 className = "CommentContent">{content}</h2>
        </Comment.Text>
      </Comment.Content>
    </Comment>
    </Segment>
    )
}

export default MyComment
