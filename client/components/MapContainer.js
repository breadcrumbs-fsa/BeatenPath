import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
import React from 'react'
import Map from './Map'

import '../../secrets'

const mapkey = process.env.GOOGLE_MAPJS_API

export const MapContainer = () => (
  <Map
    isMarkerShown
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapkey}&js?v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{height: `100%`}} />}
    containerElement={<div style={{height: `400px`}} />}
    mapElement={<div style={{height: `100%`}} />}
  />
)

export default MapContainer
