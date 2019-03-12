import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import ggl from 'graphql-tag'
import { Query } from 'react-apollo'
import Element from './Element'

const LIST_QUERY = ggl`
    query RootQueryType{
        lists{
            id
            desc,
            completed
        }
    }
`




export default class Item extends Component {


  render() {

    return (
      <div>
        <h1> Todo </h1>
        <Query query={LIST_QUERY}>
          {
            ({ loading, error, data }) => {

              if (loading) return <h1> Loading ...</h1>
              if (error) console.log(error)

              return <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                {
                  data.lists.reverse().map(elem => <Element elem={elem} key={elem.id} />)
                }
              </Grid>
            }
          }
        </Query>
      </div>
    )
  }
}
