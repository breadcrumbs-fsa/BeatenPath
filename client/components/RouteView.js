import {DirectionsRenderer} from 'react-google-maps'
import React, {Component, createContext, useContext} from 'react'
import {Store} from '../app'
import {colorPicker} from '../utils/colorPicker'

export const RouteView = () => {
  const [state, dispatch] = useContext(Store)
  return <RouteViewer segments={state.segments} dispatch={dispatch} />
}

const RouteViewer = props => {
  return (
    <div>
      {props.segments &&
        props.segments.map((segment, index) => (
          <DirectionsRenderer
            key={index}
            directions={segment}
            options={{
              suppressMarkers: true,
              polylineOptions: {strokeColor: colorPicker(index)}
            }}
          />
        ))}
    </div>
  )
}

export default RouteView
