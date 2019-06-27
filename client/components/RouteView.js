import {
  DirectionsRenderer,
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import React, {Component} from 'react'
import Map from './Map'

import '../../secrets'

const mapkey = process.env.GOOGLE_MAPJS_API

export default class RouteView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: []
    }
  }

  async componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService()
    await DirectionsService.route(
      {
        origin: new google.maps.LatLng(41.85073, -87.65126),
        destination: new google.maps.LatLng(41.85258, -87.65141),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('ROUTE VIEW1:', result)
          this.setState({
            directions: [...this.state.directions, result]
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )

    await DirectionsService.route(
      {
        origin: new google.maps.LatLng(41.85258, -87.65141),
        destination: new google.maps.LatLng(41.854616, -87.646359),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: [...this.state.directions, result]
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )

    console.log('ROUTEVIEW2: ', this.state)
  }

  render() {
    return (
      this.state.directions && (
        <div>
          <DirectionsRenderer directions={this.state.directions[0]} />
          <DirectionsRenderer directions={this.state.directions[1]} />
        </div>
      )
    )
  }
}
