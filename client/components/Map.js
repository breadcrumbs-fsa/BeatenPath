import React from 'react'
import {compose, withProps} from 'recompose'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
const secrets = require('../../secrets')

const mapkey = process.env.GOOGLE_MAPJS_API
const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapkey}&js?v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: '100%'}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{lat: 41.8781, lng: -87.6298}}>
    {props.isMarkerShown && (
      <Marker position={{lat: 41.913501, lng: -87.648163}} />
    )}
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

//     }
//   <GoogleMap
//   defaultZoom={8}
//   defaultCenter={{lat : -34.397, lng : 150.644}}
// >
//
// {props.isMarkerShown && <Marker position ={{lat : -34.397, lng : 150.644}} />}
//
// <MyMapComponent
//   isMarkerShown
//   googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
// loadingElement={<div style={{height:'100%'}}/>}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />
// <MyMapComponent isMarkerShown ={false} />
