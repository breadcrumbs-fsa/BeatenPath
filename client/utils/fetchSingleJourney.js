import axios from 'axios'

export async function fetchSingleJourney(
  journeyId,
  dispatch,
  dispatchType = 'SET_SINGLE_JOURNEY'
) {
  try {
    const {data: singleJourney} = await axios.get(`/api/journeys/${journeyId}`)
    console.log('did it hit at least?')
    dispatch({
      type: dispatchType,
      journey: singleJourney
    })
  } catch (error) {
    console.log(error)
  }
}
