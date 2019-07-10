import {directions} from './directions'
import {addBounds} from '../hooks-store/search/boundsReducer'

export async function singleJourneyPlaces(
  segmentsArray,
  placesService,
  dispatch,
  state
) {
  let outerExecutor = async (resolve, reject) => {
    segmentsArray.forEach(segment =>
      directions(segment.segmentStart, segment.segmentEnd, dispatch)
    )
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
        resolve()
      } catch (error) {
        reject()
        console.log(error)
      }
    }
  }
  return new Promise(outerExecutor)
}
