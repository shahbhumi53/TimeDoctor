import { START_TIMER, STOP_TIMER } from '../actions'

var initialState = {
  startTimer: {
    time: 0,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      localStorage.setItem('startTimer', JSON.stringify(action.payload));
      return { ...state, startTimer: { ...action.payload }}
    case STOP_TIMER:
      const { ...stopTimer } = action.payload
      localStorage.setItem('startTimer', JSON.stringify(stopTimer));
      return { ...state, startTimer: { ...action.payload }}
    default:
      return state
  }
}