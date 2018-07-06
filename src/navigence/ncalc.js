import React, { Component } from 'react';
import {Form, Card, CardBody} from 'reactstrap';

import './ncalc.css'

import FormSlider from './FormSlider'
import NResults from './NResults'


class NCalc extends Component {
  constructor(props){
    super(props)
    this.state = {

      ownership: {
        label:"What is your ownership percentage in the business?" ,
        units: "%",
        min: 1,
        max: 100,
        step: 1,
        value: 100
      },
      worth:{
        label:"How much do you estimate your business is worth?",
        units: "$",
        min: 0,
        max: 10000000,
        step: 50000,
        value: 4500000
      },
      debt:{
        label:"How much business debt do you have?",
        units: "$",
        min: 0,
        max: 1000000,
        step: 10000,
        value: 0
      },
      taxrate:{
        label:"What tax rate (combined federal and state) would you like to assume for the sale?",
        units:"%",
        min:0,
        max:50,
        step:1,
        value: 25
      },
      keyperson: {
        label:"What amount would you like to allocate to a key person incentive (% of business value)?",
        units: "%",
        min:0,
        max:100,
        step:1,
        value: 5
      },
      income: {
        label: "How much annual pretax income do you want for the rest of your life?",
        units: "$",
        min: 10000,
        max: 1000000,
        step: 10000,
        value: 250000
      },
      assets: {
        label: "What income producing assets do you own outside of your business?",
        units: "$",
        min: 0,
        max: 10000000,
        step: 10000,
        value: 500000
      },
      returnrate: {
        label: "What pre-tax rate of return on your investments would you like to assume?",
        units: "%",
        min: 0,
        max: 25,
        step: 0.25,
        value: 5
      },
      useprincipal: {
        label: "Would you like to assume investment principal is consumed for income?",
        units: "boolean",
        min: 0,
        max: 1,
        step: 1,
        value: 1
      },
      years: {
        label: "If yes, over how many years do you need income?",
        min: 0,
        max: 50,
        step: 1,
        value: 30
      }

    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    //console.log(e.target.name, e.target.value)
    let st = {}
    st[e.target.name] = this.state[e.target.name]
    if(e.target.type==="range"){
      st[e.target.name].value = parseFloat(e.target.value,10)
    }else{
      st[e.target.name].value = e.target.value
    }
    //console.log(st)
    this.setState(st)
  }
  render() {

    let questions = Object.keys(this.state).map(
      x => {
        return (<FormSlider
          key={x}
          name={x}
          label={this.state[x].label}
          value={this.state[x].value}
          units={this.state[x].units}
          min={this.state[x].min}
          max={this.state[x].max}
          step={this.state[x].step}
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

    let data = {}
    Object.keys(this.state).forEach(
      x => {
        data[x] = this.state[x].value
      }
    )
    //console.log("data", data)
    return (
    <div>
      <Card className="NCalc">
        {htmlForm}
      </Card>
      <Card className="NCalc">
        <CardBody>
          <h2>Your results</h2>
          <hr/>
          <NResults {...data}/>
        </CardBody>
      </Card>
    </div>)
  }
}

export default NCalc;
