import React, {useContext} from 'react'
import Map from './Map'
import '../../secrets'
import {StoreContext} from '../app'
const mapkey = process.env.GOOGLE_MAPJS_API
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
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_MAPJS_API
          }&js?v=3.exp&libraries=geometry,drawing,places`}
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

export default withRouter(MapContainer)
