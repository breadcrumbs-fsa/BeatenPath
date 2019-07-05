export const GET_MULTIPLE_JOURNEYS = 'GET_MULTIPLE_JOURNEYS'

export const CLEAR_JOURNEYS = 'CLEAR_JOURNEYS'

export const getMultiJourneys = journeys => ({
  type: GET_MULTIPLE_JOURNEYS,
  journeys
})

export const journeysReducer = (journeysState, action) => {
  switch (action.type) {
    case GET_MULTIPLE_JOURNEYS:
      return action.journeys
    case CLEAR_JOURNEYS:
      console.log('HELLOO')
      return []
    default:
      return journeysState
  }
}

export default journeysReducer
