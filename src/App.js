import React, { Component } from 'react'

import {Container,Row,Col} from 'reactstrap'
import './App.css'

import NCalc from './navigence/ncalc.js'



class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <NCalc/>
        </Container>
        <footer className="footer">
          <Container>
            <Row>
              <Col sm={6}>
                <p className="text-left">
                  <small>
                    Copyright 2016-18 by
                    <a href="https://www.navigencecapital.com/"> Navigence, Inc. </a>
                    All Rights Reserved.
                  </small>
                </p>
              </Col>
              <Col sm={6}>
                <p className="text-right">
                  <small>
                    Code by
                    <a href="mailto:alan@570labs.com"> 570 Labs LLC.</a>
                  </small>
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}

export default App;
