import React, { Component } from 'react'
import { Switch, Grid } from '@material-ui/core'

export default class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sw: props.elem.checked
    }
  }
  handleChange =  (id, completed) =>{
    const body = JSON.stringify({
      query: `mutation { update(
        id: "${id}",
        completed: ${completed}){
          completed
    }}`})

    return fetch('http://localhost:5000/graphql', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "POST",
      body,

    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })

  }
  render() {
    console.log(this)
    const { elem } = this.props
    return (

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          key={elem.id}
        >

          <h1> {elem.desc} </h1>
          <Switch
            checked={this.state.checked}
            onChange={() =>this.handleChange(elem.id, !elem.completed)}
          />
        </Grid>

   
    )
  }
}
