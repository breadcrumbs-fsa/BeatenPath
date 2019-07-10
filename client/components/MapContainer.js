import React, {useContext} from 'react'
import Map from './Map'
import {StoreContext} from '../app'
import {mapjs} from '../config'
import {multiJourneys} from '../utils/multiJourneys'
import {withRouter} from 'react-router-dom'
import {PlacePreview} from '../components/PlacePreview'
import {RouteList} from '../components/RouteList'
import {JourneyList} from '../components/JourneysList'
import {HomePage} from '../components/HomePage'
import {mapStyle, mapFlags} from '../utils/mapStyle'

export const MapContainer = props => {
  const [state, dispatch] = useContext(StoreContext)
  const {location} = props

  console.log(state.mapFilter)
  let style = mapStyle(state.mapFilter)
  console.log(style)
  // if (location.pathname.match('/homepage')) {
  //   return null
  // }

  return (
    <div>
      {state.mode === 'home' ? (
        <div>
          <HomePage />
        </div>
      ) : (
        <div>
          <Map
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapjs}&js?v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{height: `100%`}} />}
            containerElement={<div style={{height: `400px`}} />}
            mapElement={<div style={{height: `100%`}} />}
            dispatch={dispatch}
            center={state.center}
            placePreview={state.placePreview}
            places={state.places}
            segmentPreview={state.segmentPreview}
            segments={state.segments}
            searchInput={state.searchInput}
            journeys={state.journeys}
            placesService={state.placesService}
            mode={state.mode}
            bounds={state.bounds}
            mapStyle={style}
          />
        </div>
      )}
      <div style={{overflowY: 'auto'}}>
        {state.mode === 'viewOnly' && (
          <div style={{overflowY: 'auto'}}>
            <RouteList style={{overflowY: 'auto'}} />
          </div>
        )}
        {state.mode === 'create' && (
          <div style={{overflowY: 'auto'}}>
            <PlacePreview />
            <RouteList style={{overflowY: 'auto'}} />
          </div>
        )}
        {state.mode === 'find' && <JourneyList style={{overflowY: 'auto'}} />}
      </div>
    </div>
  )
}

export default withRouter(MapContainer)
