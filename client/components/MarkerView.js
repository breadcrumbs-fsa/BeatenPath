import {DirectionsRenderer, GoogleMap, Marker} from 'react-google-maps'
import {MarkerWithLabel} from 'react-google-maps/lib/components/addons/MarkerWithLabel'
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
          // label={{
          //   path: google.maps.MarkerLabel,
          //   text: null
          // }}
          icon="/marker-startnum.png"
          // strokeColor: colorPicker(-1),
          // fillColor: colorPicker(-1),
          // fillOpacity: 1,
          // scale: 7

          position={props.placePreview[0].geometry.location}
        />
      )}
      {props.places[0] &&
        props.places.map((place, index) => (
          <Marker
            icon={`/markernums${index + 1}.png`}
            key={index}
            position={place.geometry.location}
          />
        ))}
    </div>
  )
}

export default MarkerView
