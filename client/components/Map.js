import _ from 'lodash'
import React, {Component} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import MarkerView from './MarkerView'
import RouteView from './RouteView'
import {directions} from '../utils/directions'
import {ADD_PLACE_PREVIEW} from '../hooks-store/places/placePreviewReducer'

export class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bounds: null,
      center: {lat: 41.851, lng: -87.6513}
    }
  }
  componentDidMount() {
    const refs = {}
    this.setState({
      onMapMounted: ref => {
        console.log('refmap: ', ref)
        refs.map = ref
      },
      onIdle: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter()
        })
      },
      onSearchBoxMounted: ref => {
        console.log('refsearch: ', ref)
        refs.searchBox = ref
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces()
        // const bounds = new google.maps.LatLngBounds()
        //
        // places.forEach(place => {
        //   if (place.geometry.viewport) {
        //     bounds.union(place.geometry.viewport)
        //   } else {
        //     bounds.extend(place.geometry.location)
        //   }
        // })
        const nextMarkers = places.map(place => ({
          position: place.geometry.location
        }))
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center)
        this.setState({
          center: nextCenter
        })
        this.props.dispatch({type: ADD_PLACE_PREVIEW, place: places})
        if (this.props.places.length > 0) {
          directions(
            this.props.places[this.props.places.length - 1].place_id,
            places[0].place_id,
            this.props.dispatch,
            'WALKING',
            'PREVIEW_SEGMENT'
          )
        }
      }
    })
  }
  render() {
    console.log('onMapMounted: ', this.state.onMapMounted)
    return (
      <GoogleMap
        defaultOptions={{mapTypeControl: false}}
        ref={this.state.onMapMounted}
        defaultZoom={14}
        defaultCenter={{lat: 41.85258, lng: -87.65138}}
        center={this.state.center}
        onIdle={this.state.onIdle}
      >
        <SearchBox
          ref={this.state.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
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
        <MarkerView />
        <RouteView />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MyMapComponent))
