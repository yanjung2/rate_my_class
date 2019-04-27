import React from 'react'
import { Item, Segment, Label, ItemImage, Grid } from 'semantic-ui-react';
import RadarChart from 'react-svg-radar-chart';


const MyItem = (props) => {
    console.log(props)
    const data = props.data
    //const {tags} = data.tag
  
    return(
    <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>
      <RadarChart width = {250} height = {100} margin = {0} data = { data.data} captions = { data.captions} options = { data.options} />
      </Grid.Column>
      <Grid.Column>
      <br/><br/><br/><br/><br/>
        <div>
          <p className="prediction"> Our Opinion:</p>
          <p className="prediction_content">{data.prediction}</p>

        </div>
        <div>
        <p className="ItemLabel">tags:</p>
        {data.tag && Object.keys(data.tag).map(tag =>{
          return(
            <Label as='a'color = 'brown' tag>
              {tag}
            </Label>
          )
        })}
            
        </div>
      </Grid.Column>
    </Grid.Row>
    </Grid>
    )
}

export default MyItem
