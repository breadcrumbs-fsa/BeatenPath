import _ from 'lodash'
import React, {Component} from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import '../../secrets'
import RouteView from './RouteView'
const mapkey = process.env.GOOGLE_MAPJS_API

export class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bounds: null,
      center: {lat: 41.851, lng: -87.6513},
      markers: []
    }
  }

  componentWillMount() {
    const refs = {}

    this.setState({
      onMapMounted: ref => {
        refs.map = ref
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter()
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces()
        const bounds = new google.maps.LatLngBounds()

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        })
        const nextMarkers = places.map(place => ({
          position: place.geometry.location
        }))
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center)

        this.setState({
          center: nextCenter,
          markers: nextMarkers
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <GoogleMap
        ref={this.state.onMapMounted}
        defaultZoom={15}
        defaultCenter={{lat: 41.85258, lng: -87.65141}}
        center={this.state.center}
        onBoundsChanged={this.state.onBoundsChanged}
      >
        <SearchBox
          ref={this.state.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.state.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </SearchBox>
        {this.state.markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
        <RouteView />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MyMapComponent))
