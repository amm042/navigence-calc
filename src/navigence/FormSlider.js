import React, { Component } from 'react';
import {FormGroup, Label, Input, Col} from 'reactstrap';
class FormSlider extends Component {
  constructor(props){
    super(props)

    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    });

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    if (e.target.type ==="text"){
      //remove all formats
      let clean = e.target.value.replace(",", "")
      clean = clean.replace("$","")
      clean = clean.replace("%","")
      e.target.value = clean
      this.props.onChange(e)
    }else if (e.target.type==="range" || e.target.type==="number"){


      //console.log("value is ", parseInt(e.target.value, 10))
      //e.target.value = parseInt(e.target.value, 10)

      this.props.onChange(e)
    }else{
      console.log("ERROR, bad target type.")
    }
  }
  render(){

    let txtVal = this.props.value
    if (this.props.units==="$"){
      txtVal = this.formatter.format(this.props.value)
    } else if (this.props.units ==="%"){
      txtVal = this.props.value + this.props.units
    } else if (this.props.units === "boolean"){
      txtVal = this.props.value === 0 ? "No" : "Yes"
    }

    return (
      <FormGroup row className="m-auto">
          <Label sm={5}>{this.props.label || "No label"}</Label>
          <Col sm={4} className="m-auto">
            <Input
              name={this.props.name}
              type="range"
              value={this.props.value}
              max={this.props.max || 100}
              min={this.props.min || 0}
              step={this.props.step || 100}
              onChange={this.handleChange}/>
          </Col>
          <Col sm={3} className="m-auto">
            <p className="m-auto">{txtVal}</p>
          </Col>
      </FormGroup>
    )
  }
}
export default FormSlider;
