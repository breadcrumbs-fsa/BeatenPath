import _ from 'lodash'
import React, {Component} from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import RouteView from './RouteView'
import {directions} from '../utils/directions'
import {ADD_PLACE_PREVIEW} from '../hooks-store/placePreviewReducer'
import {
  DELETE_FIRST_OR_LAST,
  DELETE_SEGMENT
} from '../hooks-store/segmentsReducer'

export class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bounds: null,
      center: {lat: 41.851, lng: -87.6513},
      //markers used for map markers, places used to draw routes
      markers: [],
      places: []
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
        // this.setState({
        //   center: nextCenter,
        //   markers: [...this.state.markers, nextMarkers[0]],
        //   places: [...this.state.places, places]
        // })

        console.log('MARKERS & PLACES', nextMarkers[0], places)
        this.props.dispatch({type: ADD_PLACE_PREVIEW, place: places})
        //TODO: can we do markers & routes with just single state value?

        // places should never have more than two items in it,
        // when we add the 3rd+ item to markers,  add it to places & remove 1st element, shifting places array
        if (this.state.markers.length > 2) {
          this.setState({
            places: this.state.places.splice(1, 2)
          })
        }

        // Uses the two items in places to draw route.
        // Currently have to pass props in as util function doesnt have access to dispatch from react context
        if (this.state.markers.length > 1) {
          directions(
            this.state.places[0][0].place_id,
            this.state.places[1][0].place_id,
            this.props.dispatch,
            'WALKING'
          )
        }
      }
    })
  }

  render() {
    return (
      <GoogleMap
        defaultOptions={{mapTypeControl: false}}
        ref={this.state.onMapMounted}
        defaultZoom={15}
        defaultCenter={{lat: 41.85258, lng: -87.65141}}
        center={this.state.center}
        onBoundsChanged={this.state.onBoundsChanged}
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
        {this.props.placePreview[0] &&
          (console.log(
            'PLACE PREVIEwW: ',
            this.props.placePreview[0].geometry.location
            // 'MARKER:',this.state.markers[0].position,
            // this.props.placePreview[0].geometry.location == this.state.markers[0].position
          ),
          <Marker position={this.props.placePreview[0].geometry.location} />)}
        <RouteView />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MyMapComponent))
