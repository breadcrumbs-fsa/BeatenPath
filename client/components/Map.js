import _ from 'lodash'
import React, {Component} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import MarkerView from './MarkerView'
import RouteView from './RouteView'
import {directions} from '../utils/directions'
import {multiJourneys} from '../utils/multiJourneys'
import {ADD_PLACE_PREVIEW} from '../hooks-store/places/placePreviewReducer'
import {ADD_REF} from '../hooks-store/search/searchReducer'
import {ALL_SEGMENTS} from '../hooks-store/segments/segmentsReducer'
import {fetchSingleJourney} from '../utils/fetchSingleJourney'

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
        refs.map = ref
      },

      onIdle: () => {
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
      },

      onInputMounted: ref => {
        this.props.dispatch({type: 'ADD_REF', ref: ref})
      },

      //for store access have to pass in props below in arrow function
      onClickHandler: async (event, props) => {
        console.log(event, props)
        if (event.placeId) {
          const placesService = new google.maps.places.PlacesService(
            refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
          )
          await placesService.getDetails(
            {placeId: event.placeId},
            (results, status) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                props.dispatch({type: ADD_PLACE_PREVIEW, place: [results]})
                if (props.places.length > 0) {
                  directions(
                    props.places[props.places.length - 1].place_id,
                    results.placeId,
                    props.dispatch,
                    'WALKING',
                    'PREVIEW_SEGMENT'
                  )
                }
              } else {
                console.log('placesQuery Failed: ', status)
              }
            }
          )
        } else {
          const geocoder = new google.maps.Geocoder()
          const lat = event.latLng.lat()
          const lng = event.latLng.lng()
          const latlng = {lat: parseFloat(lat), lng: parseFloat(lng)}
          await geocoder.geocode({location: latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                console.log(results[1])

                props.dispatch({type: ADD_PLACE_PREVIEW, place: [results[1]]})
                if (props.places.length > 0) {
                  directions(
                    props.places[props.places.length - 1].place_id,
                    results[1].place_id,
                    props.dispatch,
                    'WALKING',
                    'PREVIEW_SEGMENT'
                  )
                }
              } else {
                console.log('No results found')
              }
            } else {
              console.log('Geocoder failed due to: ' + status)
            }
          })
        }
      }
    })

    multiJourneys(this.props.dispatch)
    console.log('hello')
  }
  render() {
    console.log('map journeys: ', this.props.journeys)
    return (
      <GoogleMap
        defaultOptions={{
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false
        }}
        ref={this.state.onMapMounted}
        defaultZoom={14}
        defaultCenter={{lat: 41.85258, lng: -87.65138}}
        center={this.state.center}
        onIdle={this.state.onIdle}
        onClick={event => this.state.onClickHandler(event, this.props)}
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
            ref={this.state.onInputMounted}
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
