import moment from 'moment'
import React from 'react'

const timeSplit =(t, index)=>(
  <div key={index}>
    {t}
  </div>
)

const ShowTracker = (props) => {
  const widgetTime =moment.utc(moment.duration(props.startTimer ? props.startTimer.time : 0, 's').asMilliseconds()).format('HH:mm')
  const time= moment.utc(moment.duration(props.startTimer ? props.startTimer.time : 0, 's').asMilliseconds()).format('HH:mm:ss')
  const isWidget =  props.timeTrackerReducersWidget ? widgetTime: time
  return(
  <div className={props.className} name={props.name} >
    {
      isWidget.split('').map(function(t, index){
      return timeSplit(t, index)
    })
    }
  </div>
)}

export default ShowTracker;