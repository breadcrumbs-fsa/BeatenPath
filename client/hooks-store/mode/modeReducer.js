export const CHANGE_MODE = 'CHANGE_MODE'

export const changingMode = mode => ({
  type: CHANGE_MODE,
  mode
})

export const modeReducer = (modeState, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return action.mode
    default:
      return modeState
  }
}
