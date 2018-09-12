import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startTimer, stopTimer, setTimer } from '../redux/actions'
import ShowTracker from './showTracker.jsx'
import Play from '../images/play.svg'
import Pause from '../images/stop.svg'

class TimeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startedTracking: false,
      buttonLabel:'Play',
      timeStart:moment(),
      time: 0,
      session: 0,
      startTimer:{}
    };
  }

  componentWillMount() {
    this.timer1 = setInterval(() => {
      if (this.getTimer) {
        return this.setState({startTimer: this.getTimer()})
      } else {
        this.setState({startTimer: this.getTimer()})
      }
      if (this.getTimer() && this.getTimer()) {
        this.setState({startTimer: this.getTimer()})
      }
    }, 500)
  }

  componentDidMount () {
    clearInterval(this.timer)
    if(this.getTimer() && !this.getTimer().startedTracking){
      this.setState({startTimer: this.getTimer() })
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer1);
  }

  componentWillReceiveProps (nextProps) {
    if (this.getTimer()) {
      return this.setState({startTimer: this.getTimer()})
    }
  }

  getTimer = () => {
    return localStorage.getItem('startTimer') && JSON.parse(localStorage.getItem('startTimer'))
  }

  startTimer = () => {
    const session = this.state.session + 1
    this.timer = setInterval(() => {
      const stopInterval = localStorage.getItem('stopInterval')
      if(stopInterval !== 'true') {
        this.props.startTimer(
          localStorage.getItem('startTimer') ? {
              ...JSON.parse(localStorage.getItem('startTimer')),
              startedTracking: true,
              time: JSON.parse(localStorage.getItem('startTimer')).time + 1
            }
            : {
              session: session,
              startedTracking: true,
              timeStart: moment.utc(),
              time: this.props.timeTrackerReducers.startTimer.time + 1,
              buttonLabel: 'Pause'
            }
        )
      } else {
        clearInterval(this.timer);
      }
    }, 1000)

    this.setState({startTimer: this.getTimer(), startedTracking: true})

    localStorage.setItem('stopInterval', 'false');
  }


  stopTimer=()=> {
    debugger;
    this.props.stopTimer(
      localStorage.getItem('startTimer') ? {
        ...JSON.parse(localStorage.getItem('startTimer')),
          startedTracking: false,
          time: JSON.parse(localStorage.getItem('startTimer')).time,
      }:{
        startedTracking: false,
        timeEnd: moment(),
        time: this.props.timeTrackerReducers.time,
      }
    );
    clearInterval(this.timer);
    this.setState({startedTracking: false})
    localStorage.setItem('stopInterval', 'true');
  }

  handleClick = () => {
    if(JSON.parse(localStorage.getItem('startTimer')) && JSON.parse(localStorage.getItem('startTimer')).startedTracking) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-time">
          <ShowTracker
            startTimer={JSON.parse(localStorage.getItem('startTimer'))}
            className={'time_track'}
            name={this.props.name}
          />
          <button
            className={this.props.buttonClass}
            onClick={this.handleClick}>{JSON.parse(localStorage.getItem('startTimer'))
            ? JSON.parse(localStorage.getItem('startTimer')).startedTracking ?
              <img src={Pause} /> : <img src={Play} /> : <img src={Play} />}
          </button>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    timeTrackerReducers: state.timeTrackerReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    startTimer,
    stopTimer,
  },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker)