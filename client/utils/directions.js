export async function directions(place1, place2, dispatch, type = 'DRIVING') {
  const DirectionsService = new google.maps.DirectionsService()
  const DirectionsDisplay = new google.maps.DirectionsRenderer()
  DirectionsService.route(
    {
      // origin: new google.maps.LatLng(41.85073, -87.65126),
      origin: {placeId: place1},
      destination: {placeId: place2},
      travelMode: type
    },
    async (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        await DirectionsDisplay.setDirections(result)

        dispatch({
          type: 'ADD_SEGMENT_1',
          segment: DirectionsDisplay.getDirections()
        })
      } else {
        console.error(`error fetching directions ${result}`)
      }
    }
  )
}
