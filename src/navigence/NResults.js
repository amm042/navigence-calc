import React, { Component } from 'react'
import {Row, Col} from 'reactstrap'
class NResults extends Component {
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
  }
  doubleLehman(amt){
    let rate = 0.1
    let result = 0.0
    while ((amt > 0) && (rate > 0.03)){
      if (amt > 1000000){
        result += 1000000 * rate
        amt -= 1000000
      }else{
        result += amt * rate
        amt = 0
      }
      rate -= 0.02
    }
    return result + rate * amt
  }
  pmt(rate, nperiod, pv, fv, type){
    //https://stackoverflow.com/questions/5294074/pmt-function-in-javascript
    if (!fv) fv = 0;
    if (!type) type = 0;
    if (rate === 0) return -(pv + fv)/nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type === 1) {
        pmt /= (1 + rate);
    };

    return pmt;
  }
  calc (args){
    let r = {}
    r.trans = 25000 + this.doubleLehman(args.worth)
    r.kpi = args.worth * ( args.keyperson / 100.0)
    r.tax = (args.worth - r.trans - r.kpi - args.debt) *
      (args.taxrate / 100.0)
    r.proceed = args.worth - r.trans - r.kpi - args.debt - r.tax
    r.yourproceed = (args.ownership / 100.0) * r.proceed
    r.investable = r.yourproceed + args.assets
    r.project = (args.useprincipal === 1) ?
          -this.pmt(
            args.returnrate / 100.0,
            args.years,
            r.investable,
            0,
            1) :
            r.investable * (args.returnrate / 100.0)

    r.error = r.project - args.income
    return r
  }
  solve(args){
    let i = 0
    let r = this.calc(args)
    while ((i < 100) && (Math.abs(r.error) > 0.5)){
      //console.log(i, "Error with", args.worth, "=", r.error)
      args.worth += -((100-i)/10)*r.error
      r = this.calc(args)
      i+= 1
    }
    //console.log(i, "Error with", args.worth, "=", r.error)
    return args.worth
  }
  render(){

    let {trans, kpi, tax, proceed, yourproceed, investable, project, error } =
      this.calc(this.props)

    let bval = this.solve(Object.assign({}, this.props))

    let results = {
      "Value of the business": {val: this.formatter.format(this.props.worth)},
      "Transcational costs": {val: this.formatter.format(trans)},
      "Less bank debt": {val: this.formatter.format(this.props.debt)},
      "Less Key Person Incentive (Stay Bonus, Continuity Bonus, etc.)":
        {val: this.formatter.format(kpi)},
      "Less taxes": {val: this.formatter.format(tax)},
      "Net proceeds from the sale": {
        val: this.formatter.format(proceed),
        namecls: "font-weight-bold text-left",
        valcls: "font-weight-bold text-right"
      }
    }

    let analysis = {
      "Your ownership percentage in the business": {
        val: this.props.ownership + "%"},
      "Your after-tax proceeds from the sale": {
        val: this.formatter.format(yourproceed)
      },
      "Income producing assets outside your business": {
        val: this.formatter.format(this.props.assets)},
      "Total investable funds": {
        val:this.formatter.format(investable)},
      "Annual pretax income needed for life": {
        val: this.formatter.format(this.props.income)},
      "Actual projected annual pretax income after the sale": {
        val: this.formatter.format(project),
        namecls: "font-weight-bold text-left",
        valcls: "font-weight-bold text-right"
      },
      "Annual income surplus or deficit compared to income objective":{
        val: this.formatter.format(error),
        valcls: (error < 0) ?
          "font-weight-bold text-danger text-right" :
          "font-weight-bold text-success text-right"
      },
      "Calculated business value (rounded) necessary to meet your stated income goal":{
        val: this.formatter.format(bval),
        namecls: "font-weight-bold text-left",
        valcls: "font-weight-bold text-right"
      }
    }
    let mkrow = (obj, x) => {
      return (
        <Row key={x}>
          <Col sm={8}>
            <p className={obj[x].namecls || "text-left"}>{x}</p>
          </Col>
          <Col sm={4}>
            <p className={obj[x].valcls || "text-right"}>
              {obj[x].val}
            </p>
          </Col>
        </Row>
      )
    }
    let d = Object.keys(results).map(x => mkrow(results, x))
    let a = Object.keys(analysis).map(x => mkrow(analysis, x))

    return (<div>
            {d}
            <hr/>
            {a}
            </div>
    )
  }
}
export default NResults
