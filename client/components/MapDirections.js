import React from 'react'
import {compose, withProps, lifecycle} from 'recompose'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from 'react-google-maps'
import '../../secrets'

const mapkey = process.env.GOOGLE_MAPJS_API
const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapkey}&js?v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: '100%'}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService()

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(41.85073, -87.65126),
          destination: new google.maps.LatLng(41.85258, -87.65141),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            })
          } else {
            console.error(`error fetching directions ${result}`)
          }
        }
      )
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
))

export default class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({isMarkerShown: true})
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({isMarkerShown: false})
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}
