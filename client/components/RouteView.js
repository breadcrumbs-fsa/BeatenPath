import {DirectionsRenderer} from 'react-google-maps'
import React, {Component, createContext, useContext} from 'react'
import {StoreContext} from '../app'
import {colorPicker} from '../utils/colorPicker'

export const RouteView = () => {
  const [state, dispatch] = useContext(StoreContext)
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
      {props.segmentPreview.length !== 0 &&
        (console.log('inside'),
        (
          <DirectionsRenderer
            key={-1}
            directions={props.segmentPreview[0]}
            options={{
              suppressMarkers: true,
              polylineOptions: {strokeColor: colorPicker(-1)},
              preserveViewport: true
            }}
          />
        ))}
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
