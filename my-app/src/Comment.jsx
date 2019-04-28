import React from 'react'
import { Comment, Segment } from 'semantic-ui-react'

const MyComment = (props) => {
  console.log(props)
  const {comments} = props
    return(
    <div className="commentdiv">
    { comments && comments.map(comment => {
      return(
            <Segment className = "Comments" >
            <Comment>
              <Comment.Content>
                <h3 className = "CommentAuthor">{comment.uid}</h3>
                <Comment.Metadata className = "Commentmeta">
                  <h5 className = "postTime">Post Time:{ comment.time }</h5>
                </Comment.Metadata >
                <Comment.Text className = "ClassContent">
                  <h2 className = "CommentContent">{comment.comment}</h2>
                </Comment.Text>
              </Comment.Content>
            </Comment>
            </Segment>

      )
    })}
    </div>
    )
}

export default MyComment
