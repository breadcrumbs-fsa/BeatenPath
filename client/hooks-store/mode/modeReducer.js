export const CREATING_MODE = 'CREATING_MODE'
export const FINDING_MODE = 'FINDING_MODE'

export const findingMode = finding => ({
  type: FINDING_MODE,
  finding
})

export const creatingMode = creating => ({
  type: CREATING_MODE,
  creating
})

export const modeReducer = (modeState, action) => {
  switch (action.type) {
    case FINDING_MODE:
      return action.finding
    case CREATING_MODE:
      return action.creating
    default:
      return modeState
  }
}
