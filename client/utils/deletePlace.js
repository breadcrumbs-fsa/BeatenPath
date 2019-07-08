export async function deletePlace(places, segments, placeIndex, dispatch) {
  if (placeIndex === 0 || placeIndex === places.length - 1) {
    dispatch({type: 'DELETE_FIRST_OR_LAST', index: placeIndex})
  } else {
    const DirectionsService = new google.maps.DirectionsService()
    console.log(places, placeIndex)
    await DirectionsService.route(
      {
        origin: {placeId: places[placeIndex].place_id},
        destination: {placeId: places[placeIndex + 2].place_id},
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
