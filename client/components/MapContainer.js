import React, {useContext} from 'react'
import Map from './Map'
import {StoreContext} from '../app'
import {mapjs} from '../config'
import CommandBar from './CommandBar'
import {multiJourneys} from '../utils/multiJourneys'
import {withRouter} from 'react-router-dom'

const MapContainer = props => {
  const [state, dispatch] = useContext(StoreContext)
  const {location} = props
  if (location.pathname.match('/homepage')) {
    return null
  }

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
          segments={state.segments}
          searchInput={state.searchInput}
          journeys={state.journeys}
          placesService={state.placesService}
        />
      </div>
      <div>
        <CommandBar />
      </div>
    </div>
  )
}

export default withRouter(MapContainer)
