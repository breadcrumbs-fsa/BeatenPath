import axios from 'axios'

export async function saveJourney(
  journeyName,
  segmentArray,
  placesArray,
  dispatch
) {
  try {
    console.log('segmentArray ', segmentArray)
    const {data: newJourney} = await axios.post('/api/journeys', {
      name: journeyName,
      journeyStart: segmentArray[0].geocoded_waypoints[0].place_id,
      journeyEnd:
        segmentArray[segmentArray.length - 1].geocoded_waypoints[1].place_id
    })
    console.log('newJourney: ', newJourney)
    await segmentArray.forEach(async (segment, index) => {
      const {data: newSegment} = await axios.post('/api/segments', {
        segmentStart: segment.geocoded_waypoints[0].place_id,
        segmentEnd: segment.geocoded_waypoints[1].place_id,
        journeyId: newJourney.id,
        order: index,
        transportation: segment.request.travelMode,
        distance: segment.routes[0].legs[0].distance.value
      })

      console.log(newSegment)
    })

    await dispatch({
      type: 'CLEAR_PLACES'
    })
    await dispatch({type: 'CLEAR_SEGMENTS'})
  } catch (error) {
    console.log(error)
  }
}
