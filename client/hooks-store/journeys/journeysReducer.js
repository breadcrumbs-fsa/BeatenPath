export const GET_MULTIPLE_JOURNEYS = 'GET_MULTIPLE_JOURNEYS'

export const getMultiJourneys = journeys => ({
  type: GET_MULTIPLE_JOURNEYS,
  journeys
})

export const journeysReducer = (journeysState, action) => {
  switch (action.type) {
    case GET_MULTIPLE_JOURNEYS:
      return action.journeys

    default:
      return journeysState
  }
}

export default journeysReducer
