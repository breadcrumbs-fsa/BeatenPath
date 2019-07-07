import {DirectionsRenderer, GoogleMap, Marker} from 'react-google-maps'
import React, {Component, createContext, useContext} from 'react'
import {StoreContext} from '../app'
import {colorPicker} from '../utils/colorPicker'

export const MarkerView = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <MarkerViewer
      segments={state.segments}
      dispatch={dispatch}
      segmentPreview={state.segmentPreview}
      placePreview={state.placePreview}
      places={state.places}
      journeys={state.journeys}
    />
  )
}

const MarkerViewer = props => {
  return (
    <div>
      {props.placePreview[0] && (
        <Marker
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: colorPicker(-1),
            fillColor: 'black',
            fillOpacity: 1,
            scale: 7
          }}
          position={props.placePreview[0].geometry.location}
        />
      )}
      {props.places[0] &&
        props.places.map((place, index) => (
          <Marker
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              strokeColor: colorPicker(index),
              fillColor: 'black',
              fillOpacity: 1,
              scale: 7
            }}
            key={index}
            position={place.geometry.location}
          />
        ))}
    </div>
  )
}

export default MarkerView
