import React, { Component } from 'react'

import {Container} from 'reactstrap'
import './App.css'

import NCalc from './navigence/ncalc.js'



class App extends Component {
  render() {
    return (
      <Container>
        <NCalc/>
      </Container>
    );
  }
}

export default App;
