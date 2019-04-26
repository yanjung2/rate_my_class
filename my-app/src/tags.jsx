import React from 'react'
import { Label } from 'semantic-ui-react'

const Mytag = (props) => {
    
    const name = props.name;
    return(
        <Label as='a'color = 'brown' tag>
          {name}
        </Label>
)
}


export default Mytag
