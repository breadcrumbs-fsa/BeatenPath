import React, {useContext} from 'react'
import Map from './Map'
import '../../secrets'
import {StoreContext} from '../app'
const mapkey = process.env.GOOGLE_MAPJS_API
import CommandBar from './CommandBar'
import {directions} from '../utils/directions'
import {DELETE_SEGMENT} from '../hooks-store/segments/segmentsReducer'
// context wrapper

export const MapContainer = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <MapContainerView
      segments={state.segments}
      placePreview={state.placePreview}
      places={state.places}
      segmentPreview={state.segmentPreview}
      dispatch={dispatch}
    />
  )
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
          placePreview={props.placePreview}
          places={props.places}
          segmentPreview={props.segmentPreview}
        />
      </div>
      <div>
        <CommandBar />
      </div>
    </div>
  )
}

export default MapContainer
