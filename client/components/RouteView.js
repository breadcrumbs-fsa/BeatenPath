import {
  DirectionsRenderer,
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import React, {Component, createContext, useContext} from 'react'
import Map from './Map'
import {addTest} from '../hooks-store/segmentsReducer'

import '../../secrets'

const mapkey = process.env.GOOGLE_MAPJS_API

import {Store} from '../app'

export const RouteView = () => {
  const [state, dispatch] = useContext(Store)
  return <RouteViewer segments={state.segments} dispatch={dispatch} />
}

const RouteViewer = props => {
  // console.log('ROUTEVIEW2: ', this.state)

  return (
    console.log(props.segments),
    (
      <div>
        {props.segments && (
          <DirectionsRenderer directions={props.segments[0]} />
        )}
      </div>
    )
  )
}

export default RouteView

// constructor(props) {
//     super(props)
//     this.state = {
//       directions: []
//     }
//   }
//
//   async componentDidMount() {
//     const DirectionsService = new google.maps.DirectionsService()
//     await DirectionsService.route(
//       {
//         origin: new google.maps.LatLng(41.85073, -87.65126),
//         destination: new google.maps.LatLng(41.85258, -87.65141),
//         travelMode: google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           console.log('ROUTE VIEW1:', result)
//           this.setState({
//             directions: [...this.state.directions, result]
//           })
//         } else {
//           console.error(`error fetching directions ${result}`)
//         }
//       }
//     )
//
//     await DirectionsService.route(
//       {
//         origin: new google.maps.LatLng(41.85258, -87.65141),
//         destination: new google.maps.LatLng(41.854616, -87.646359),
//         travelMode: google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: [...this.state.directions, result]
//           })
//         } else {
//           console.error(`error fetching directions ${result}`)
//         }
//       }
//     )

// <DirectionsRenderer directions={this.state.directions[0]} />
//                 <DirectionsRenderer directions={this.state.directions[1]} />
