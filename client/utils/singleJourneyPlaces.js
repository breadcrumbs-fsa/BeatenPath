import {directions} from './directions'

export async function singleJourneyPlaces(
  segmentsArray,
  placesService,
  dispatch,
  state
) {
  const DirectionsService = new google.maps.DirectionsService()
  const segDirectionPromises = segmentsArray.map(segment => {
    let executor = (resolve, reject) =>
      DirectionsService.route(
        {
          origin: {placeId: segment.segmentStart},
          destination: {placeId: segment.segmentEnd},
          travelMode: 'WALKING'
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result)
          } else {
            reject(status)
            console.error(`error fetching directions ${result}`)
          }
        }
      )

    return new Promise(executor)
  })
  const segDirections = await Promise.all(segDirectionPromises)
  dispatch({
    type: 'ADD_SEGMENTS_ARRAY',
    segments: segDirections
  })

  let placeIdArray = []
  if (segmentsArray.length > 0) {
    placeIdArray.push(
      segmentsArray[0].segmentStart,
      segmentsArray[0].segmentEnd
    )
    if (segmentsArray.length > 1) {
      if (segmentsArray.length > 2) {
        for (let i = 1; i < segmentsArray.length - 1; i++) {
          placeIdArray.push(segmentsArray[i].segmentEnd)
        }
      }
      placeIdArray.push(segmentsArray[segmentsArray.length - 1].segmentEnd)
    }
    const placesPromises = placeIdArray.map(placeID => {
      let executor = (resolve, reject) =>
        placesService.getDetails({placeId: placeID}, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            resolve(results)
          } else {
            reject(status)
            console.log('placesQuery Failed: ', status)
          }
        })
      return new Promise(executor)
    })

    try {
      const placesArray = await Promise.all(placesPromises)
      dispatch({
        type: 'ADD_PLACES_ARRAY',
        places: placesArray
      })
    } catch (error) {
      console.log(error)
    }
  }
}
