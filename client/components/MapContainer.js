import React, {useContext} from 'react'
import Map from './Map'
import {StoreContext} from '../app'
import {mapjs} from '../config'
import {withRouter} from 'react-router-dom'
import {PlacePreview} from '../components/PlacePreview'
import {RouteList} from '../components/RouteList'
import {JourneyList} from '../components/JourneysList'
import {HomePage} from '../components/HomePage'
import {mapStyle} from '../utils/mapStyle'

export const MapContainer = props => {
  const [state, dispatch] = useContext(StoreContext)
  const {location} = props

  let style = mapStyle(state.mapFilter)

  return (
    <div style={{width: '100%'}}>
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
            containerElement={<div style={{height: `55vh`}} />}
            mapElement={<div style={{height: `100%`}} />}
            dispatch={dispatch}
            center={state.center}
            placePreview={state.placePreview}
            places={state.places}
            segmentPreview={state.segmentPreview}
            segments={state.segments}
            searchInput={state.searchInput}
            journeys={state.journeys}
            journey={state.journey}
            placesService={state.placesService}
            mode={state.mode}
            bounds={state.bounds}
            fitBounds={state.fitBounds}
            mapStyle={style}
          />

          {state.mode === 'viewOnly' && (
            <div
              style={{
                height: '39.5vh',
                // width: '23.4rem',
                alignItems: 'center',
                overflowY: 'auto'
              }}
            >
              <RouteList />
            </div>
          )}
          {state.mode === 'create' && (
            <div
              style={{
                height: '39.5vh',
                // width: '23.4rem',
                alignItems: 'center',
                overflowY: 'auto'
              }}
            >
              <PlacePreview />
              <RouteList />
            </div>
          )}
          {state.mode === 'find' && (
            <div
              style={{
                height: '39.5vh',
                width: '100%',
                alignItems: 'center',
                overflowY: 'auto'
              }}
            >
              <JourneyList />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default withRouter(MapContainer)
