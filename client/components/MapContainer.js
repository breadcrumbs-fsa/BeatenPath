import React, {useContext} from 'react'
import Map from './Map'
import '../../secrets'
import {Store} from '../app'
const mapkey = process.env.GOOGLE_MAPJS_API
import {directions} from '../utils/directions'
import {DELETE_SEGMENT} from '../hooks-store/segmentsReducer'
// context wrapper
export const MapContainer = () => {
  const [state, dispatch] = useContext(Store)
  return <MapContainerView segments={state.segments} dispatch={dispatch} />
}

const MapContainerView = props => {
  return (
    <div>
      <div>
        <Map
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapkey}&js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `400px`}} />}
          mapElement={<div style={{height: `100%`}} />}
          dispatch={props.dispatch}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={async function() {
            if (props.segments && props.segments.length > 2) {
              directions(
                props.segments[1].request.origin.placeId,
                props.segments[2].request.destination.placeId,
                props.dispatch,
                'WALKING',
                DELETE_SEGMENT,
                1
              )
            } else console.log('not enough segments', props)
          }}
        >
          DELETE ROUTE 2
        </button>
        <button
          type="button"
          onClick={async function() {
            const DirectionsService = new google.maps.DirectionsService()

            await DirectionsService.route(
              {
                origin: new google.maps.LatLng(41.85258, -87.65141),
                destination: new google.maps.LatLng(41.854616, -87.646359),
                travelMode: google.maps.TravelMode.DRIVING
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  // seg = result
                  props.dispatch({type: 'ADD_SEGMENT_1', segment: result})
                } else {
                  console.error(`error fetching directions ${result}`)
                }
              }
            )
            // console.log('SEG: ', seg)
          }}
        >
          ROUTE2
        </button>
      </div>
    </div>
  )
}

export default MapContainer
