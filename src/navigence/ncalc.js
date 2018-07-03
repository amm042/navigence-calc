import React, { Component } from 'react';
import {Form, Card, CardBody} from 'reactstrap';

import './ncalc.css'

import FormSlider from './FormSlider'


class NCalc extends Component {
  constructor(props){
    super(props)
    this.state = {
      ownership: 100,
      worth: 1000000,
      debt: 0,
      taxrate: 25,
      keyperson: 5,
      income: 250000,
      assets: 500000,
      returnrate: 5,
      useprincipal: true,
      years: 30,
      data: {
        ownership: {
          label:"What is your ownership percentage in the business?" ,
          units: "%",
          min: 1,
          max: 100,
          step: 1
        },
        worth:{
          label:"How much do you estimate your business is worth?",
          units: "$",
          min: 100000,
          max: 10000000,
          step: 50000
        },
        debt:{
          label:"How much business debt do you have?",
          units: "$",
          min: 0,
          max: 1000000,
          step: 10000
        },
        taxrate:{
          label:"What tax rate (combined federal and state) would you like to assume for the sale?",
          units:"%",
          min:0,
          max:50,
          step:1
        }
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    //console.log(e.target.name, e.target.value)
    let st = {}
    st[e.target.name] = e.target.value
    console.log(st)
    this.setState(st)
  }
  render() {

    let questions = Object.keys(this.state.data).map(
      x => {
        return (<FormSlider
          key={x}
          name={x}
          label={this.state.data[x].label}
          value={this.state[x]}
          units={this.state.data[x].units}
          min={this.state.data[x].min}
          max={this.state.data[x].max}
          step={this.state.data[x].step}
          onChange={this.handleChange}/>)
      }
    )
    let htmlForm = (
        <CardBody>
          <Form>
            <h2>To begin, answer these questions</h2>
            <hr/>
            {questions}
          </Form>
        </CardBody>
      )

    return (<Card className="NCalc">
      {htmlForm}
    </Card>)
  }
}

export default NCalc;
