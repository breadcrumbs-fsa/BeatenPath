export async function deletePlace(places, segments, placeIndex, dispatch) {
  if (placeIndex === 0 || placeIndex === places.length - 1) {
    dispatch({type: 'DELETE_FIRST_OR_LAST', index: placeIndex})
  } else {
    const DirectionsService = new google.maps.DirectionsService()
    await DirectionsService.route(
      {
        origin: {placeId: places[placeIndex - 1].place_id},
        destination: {placeId: places[placeIndex + 1].place_id},
        travelMode: 'WALKING'
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          dispatch({
            type: 'DELETE_PLACE',
            segment: result,
            index: placeIndex
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )
  }
}
