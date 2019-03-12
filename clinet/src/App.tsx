import React, { Component } from 'react';
import ApolloClint from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css';
import Item from './components/Item'
import { Input, Button } from '@material-ui/core';

const client = new ApolloClint({
  uri: 'http://localhost:5000/graphql'
})

class App extends Component {
  state = {
    val: ""
  }
  handleChange = () => {
    if(!this.state.val) return 
    const body: string = JSON.stringify({
      query: `mutation { createToDo(
        desc: "${this.state.val}",){
          desc
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
        client.resetStore() 
      })

  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <div style={{ color: "#fff", border: "3px solid #fff", backgroundColor: "green" }}>
              <Input style={{ color: "#fff" }} value={this.state.val} onChange={(e) => this.setState({val: e.target.value})} />
              <Button color="primary"  onClick={this.handleChange}> ADD</Button>
            </div>
            <Item />
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
