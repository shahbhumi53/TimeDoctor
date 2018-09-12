export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'

export const startTimer = (param) => {
  return dispatch =>
    dispatch ({
      type: START_TIMER,
      payload: {
        ...param
      }
  })
}

export const stopTimer = (param) => {
  return dispatch =>
    dispatch ({
      type: STOP_TIMER,
      payload: {
        ...param
      }
    })
}
