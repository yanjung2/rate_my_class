import React from 'react'
import { Item, Segment, Label, ItemImage, Grid } from 'semantic-ui-react';
import RadarChart from 'react-svg-radar-chart';
import Mytag from './tags';

const MyItem = (props) => {
    const data = props.data

    return(
    <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>
      <RadarChart width = {250} height = {100} margin = {0} data = { data.data} captions = { data.captions} options = { data.options} />
      </Grid.Column>
      <Grid.Column>
      <br/><br/><br/><br/><br/>
        <div>
            <p className="ItemLabel">tags:</p>
            <Mytag name = { 'Difficult' }/>
            <Mytag name = { 'Easy' }/>
        </div>
      </Grid.Column>
    </Grid.Row>
    </Grid>
    )
}

export default MyItem
