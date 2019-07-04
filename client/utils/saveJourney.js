import axios from 'axios'

export async function saveJourney(journeyName, segmentArray) {
  try {
    const {data: newJourney} = await axios.post('/api/journeys', {
      name: journeyName,
      journeyStart: segmentArray[0].geocoded_waypoints[0].place_id,
      journeyEnd:
        segmentArray[segmentArray.length - 1].geocoded_waypoints[1].place_id
    })

    await segmentArray.map(async (segment, index) => {
      await axios.post('/api/segments', {
        segmentStart: segment.geocoded_waypoints[0].place_id,
        segmentEnd: segment.geocoded_waypoints[1].place_id,
        journeyId: newJourney.id,
        order: index,
        transportation: segment.request.travelMode
      })
    })
  } catch (error) {
    console.log(error)
  }
}
