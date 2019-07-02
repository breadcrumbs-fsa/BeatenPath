export async function directions(
  placeId1,
  placeId2,
  dispatch,
  type = 'WALKING',
  dispatchType = 'ADD_SEGMENT_1',
  index = null
) {
  const DirectionsService = new google.maps.DirectionsService()
  const DirectionsDisplay = new google.maps.DirectionsRenderer()
  await DirectionsService.route(
    {
      origin: {placeId: placeId1},
      destination: {placeId: placeId2},
      travelMode: type
    },
    async (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        await DirectionsDisplay.setDirections(result)
        dispatch({
          type: dispatchType,
          segment: DirectionsDisplay.getDirections(),
          index: index
        })
      } else {
        console.error(`error fetching directions ${result}`)
      }
    }
  )
}
