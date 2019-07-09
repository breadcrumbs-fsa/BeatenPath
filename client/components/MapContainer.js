import React, {useContext} from 'react'
import Map from './Map'
import {StoreContext} from '../app'
import {mapjs} from '../config'
import CommandBar from './CommandBar'
import {multiJourneys} from '../utils/multiJourneys'
import {withRouter} from 'react-router-dom'
import {PlacePreview} from '../components/PlacePreview'
import {RouteList} from '../components/RouteList'
import {JourneyList} from '../components/JourneysList'
import {HomePage} from '../components/HomePage'

export const MapContainer = props => {
  const [state, dispatch] = useContext(StoreContext)
  const {location} = props
  if (location.pathname.match('/homepage')) {
    return null
  }

  return (
    <MapContainerView
      dispatch={dispatch}
      placePreview={state.placePreview}
      places={state.places}
      segmentPreview={state.segmentPreview}
      segments={state.segments}
      searchInput={state.searchInput}
      journeys={state.journeys}
      placesService={state.placesService}
      mode={state.mode}
    />
  )
}
export const MapContainerView = props => {
  return (
    <div>
      {props.mode === 'home' ? (
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
            dispatch={props.dispatch}
            placePreview={props.placePreview}
            places={props.places}
            segmentPreview={props.segmentPreview}
            segments={props.segments}
            searchInput={props.searchInput}
            journeys={props.journeys}
            placesService={props.placesService}
          />
          <PlacePreview />
        </div>
      )}
      <div style={{overflowY: 'auto'}}>
        {props.mode === 'create' && <RouteList style={{overflowY: 'auto'}} />}
        {props.mode === 'find' && <JourneyList style={{overflowY: 'auto'}} />}
      </div>
    </div>
  )
}

export default withRouter(MapContainer)
