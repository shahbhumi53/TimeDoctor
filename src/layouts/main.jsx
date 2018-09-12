import React, { Component } from 'react'
import TimeTracker from './TimeTracker.jsx'
import moment from 'moment'

import './main.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeTime:[],
    }
  }

  render(){
    const classNames=this.props.getTimer && this.props.getTimer().startedTracking ? 'header':'header inactive'
    const buttonClasses=this.props.getTimer && this.props.getTimer().startedTracking ? 'btn' : 'btn inactive'
  return(
    <div className="main-content">
      <div className={classNames}>
        <h5><img src={`${window.location.href}/int_td.png`} /> Time Doctor</h5>
      </div>
      <div className="content-body">
        <TimeTracker onChange={this.onChange} name={'time-track'} buttonClass={buttonClasses}/>
      </div>
      <div className="footer">
        <h5>
          Worked Today:{this.state.time}
        </h5>
        <p>
          Company Time: {new Date().toString()}
        </p>
      </div>
    </div>
  )
}
}
export default Main