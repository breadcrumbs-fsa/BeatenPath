import React, {useContext} from 'react'
import Map from './Map'
import {StoreContext} from '../app'
import {mapjs} from '../config'
import CommandBar from './CommandBar'
import {multiJourneys} from '../utils/multiJourneys'
const MapContainer = props => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <div>
      <div>
        <Map
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapjs}&js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `400px`}} />}
          mapElement={<div style={{height: `100%`}} />}
          dispatch={dispatch}
          placePreview={state.placePreview}
          places={state.places}
          segmentPreview={state.segmentPreview}
          segements={state.segements}
          searchInput={state.searchInput}
          journeys={state.journeys}
        />
      </div>
      <div>
        <CommandBar />
      </div>
    </div>
  )
}

export default MapContainer
