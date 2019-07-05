import {DirectionsRenderer} from 'react-google-maps'
import React, {Component, createContext, useContext} from 'react'
import {StoreContext} from '../app'
import {colorPicker} from '../utils/colorPicker'
import {fetchSingleJourney} from '../utils/fetchSingleJourney'

export const RouteView = () => {
  const [state, dispatch] = useContext(StoreContext)
  console.log('SEGMENTS: ', state.segments)
  return (
    <RouteViewer
      segments={state.segments}
      dispatch={dispatch}
      segmentPreview={state.segmentPreview}
    />
  )
}

const RouteViewer = props => {
  return (
    <div>
      {props.segmentPreview && (
        <DirectionsRenderer
          key={-1}
          directions={props.segmentPreview[0]}
          options={{
            suppressMarkers: true,
            polylineOptions: {strokeColor: colorPicker(-1)},
            preserveViewport: true
          }}
        />
      )}
      {props.segments &&
        props.segments.map((segment, index) => (
          <DirectionsRenderer
            key={index}
            directions={segment}
            options={{
              suppressMarkers: true,
              polylineOptions: {strokeColor: colorPicker(index)},
              preserveViewport: true
            }}
          />
        ))}
    </div>
  )
}

export default RouteView
