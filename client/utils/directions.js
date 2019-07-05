export async function directions(
  placeId1,
  placeId2,
  dispatch,
  type = 'WALKING',
  dispatchType = 'ADD_SEGMENT_1',
  index = null
) {
  const DirectionsService = new google.maps.DirectionsService()
  await DirectionsService.route(
    {
      origin: {placeId: placeId1},
      destination: {placeId: placeId2},
      travelMode: type
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch({
          type: dispatchType,
          segment: result,
          index: index
        })
      } else {
        console.error(`error fetching directions ${result}`)
      }
    }
  )
}
