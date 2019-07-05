import axios from 'axios'

export async function multiJourneys(
  dispatch,
  dispatchType = 'GET_MULTIPLE_JOURNEYS'
) {
  try {
    const {data: multipleJourneys} = await axios.get('/api/journeys')
    dispatch({
      type: dispatchType,
      journeys: multipleJourneys
    })
  } catch (error) {
    console.log(error)
  }
}
