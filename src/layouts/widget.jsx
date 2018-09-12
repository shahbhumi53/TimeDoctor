import React, { Component } from 'react'
import TimeTracker from './TimeTracker.jsx'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import DragDrop from '../images/dragndrop.svg'
import Clear from '../images/clear.svg'
import './widget.scss';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

class Widget extends Component {
  handleClick = () => {
    ipcRenderer.send('onWindowClose', 'close')
  }

  getTimer = () => {
    return localStorage.getItem('startTimer') && JSON.parse(localStorage.getItem('startTimer'))
  }

  componentWillMount() {
    if(this.getTimer()){
      this.timer = setInterval(() => {
          return this.setState({startTimer: this.getTimer() })
      }, 500)
    } else {
      this.setState({startTimer: this.getTimer() })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render () {
    return (
      <div className="widget-tool">
        <img src={DragDrop} />
        <div onClick={this.props.console}/>
        <span/>
        <span className="inactive"/>
        <TimeTracker
          buttonClass={'play_stop_widget'}
        />
        <span class="inactive"></span>
        <button name='Close' onClick={this.handleClick}>
          <img src={Clear} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    timeTrackerReducers: state.timeTrackerReducers
  }
}

export default withRouter(connect(mapStateToProps)(Widget))