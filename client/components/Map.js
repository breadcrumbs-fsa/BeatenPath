import _ from 'lodash'
import React, {Component} from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import MarkerView from './MarkerView'
import RouteView from './RouteView'
import {directions} from '../utils/directions'
import {multiJourneys} from '../utils/multiJourneys'
import {
  ADD_PLACE_PREVIEW,
  PLACE_PREVIEW_TO_FIRST
} from '../hooks-store/places/placePreviewReducer'
import {ADD_REF} from '../hooks-store/search/searchReducer'
import {ALL_SEGMENTS} from '../hooks-store/segments/segmentsReducer'
import {fetchSingleJourney} from '../utils/fetchSingleJourney'
import {colorPicker} from '../utils/colorPicker'
import MapControl from './MapControl'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import MapFilter from './MapFilter'
import {addBounds} from '../hooks-store/search/boundsReducer'
import {addCenter} from '../hooks-store/search/centerReducer'
// import mapFilter from './MapFilter'

export class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidUpdate() {
    this.state.getLocation()
  }

  componentDidMount() {
    console.log(this.props.center)

    const refs = {}

    this.setState({
      onMapMounted: ref => {
        refs.map = ref
        const placesService = new google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        )
        this.props.dispatch({
          type: 'ADD_PLACES_SERVICE',
          placesService: placesService
        })
      },

      getLocation: () => {
        if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            this.setState({
              user: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
            return {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        } else {
          console.log('Geolocation is not supported by this browser.')
        }
      },

      onIdle: () => {
        // this.setState({
        //   bounds: refs.map.getBounds()
        // })
        this.props.dispatch(addBounds(refs.map.getBounds()))
        this.props.dispatch(addCenter(refs.map.getCenter()))
      },

      onSearchBoxMounted: ref => {
        refs.searchBox = ref
      },

      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces()

        const nextMarkers = places.map(place => ({
          position: place.geometry.location
        }))
        const nextCenter = _.get(nextMarkers, '0.position', this.props.center)

        this.props.dispatch(addCenter(nextCenter))
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

      onMe: () => {
        this.props.dispatch(addCenter(this.state.user))
      },

      onClear: () => {
        this.props.dispatch({type: 'CLEAR_PLACES'})
        this.props.dispatch({type: 'CLEAR_SEGMENTS'})
        this.props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
      },

      //for store access have to pass in props below in arrow function
      onClickHandler: async (event, props) => {
        if (event.placeId) {
          await this.props.placesService.getDetails(
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

    //TODO: make useEffect hook for both of these in command bar
    // multiJourneys(this.props.dispatch)

    // fetchSingleJourney(2, this.props.dispatch)
  }
  render() {
    // console.log('rendering')
    return (
      <GoogleMap
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false,
          gestureHandling: 'greedy',
          styles: this.props.mapStyle
        }}
        ref={this.state.onMapMounted}
        defaultZoom={14}
        defaultCenter={{lat: 41.85258, lng: -87.65138}}
        center={this.props.center}
        onIdle={this.state.onIdle}
        onClick={event => this.state.onClickHandler(event, this.props)}
      >
        <MapControl position={google.maps.ControlPosition.LEFT_BOTTOM}>
          <button
            style={{
              backgroundColor: '#8fa3bc',
              border: 'none',
              color: 'red',
              display: 'inline-block',
              marginBottom: '10px',
              marginRight: '10px',
              fontSize: '14px',
              borderRadius: '5px'
            }}
            onClick={() => this.state.onMe()}
          >
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE1MC41LDIxLjVoLTEyOXYxMjloNDNsMjEuNSwyMS41bDIxLjUsLTIxLjVoNDN6TTg2LDQzYzEyLjE4MzMzLDAgMjEuNSw5LjMxNjY3IDIxLjUsMjEuNWMwLDEyLjE4MzMzIC05LjMxNjY3LDIxLjUgLTIxLjUsMjEuNWMtMTIuMTgzMzMsMCAtMjEuNSwtOS4zMTY2NyAtMjEuNSwtMjEuNWMwLC0xMi4xODMzMyA5LjMxNjY3LC0yMS41IDIxLjUsLTIxLjV6TTEyOSwxMjloLTg2YzAsMCAwLC00LjE5MjUgMCwtNy4xNjY2N2MwLC0xMS4yNTg4MyAxOS41MDc2NywtMjEuNSA0MywtMjEuNWMyMy40OTIzMywwIDQzLDEwLjI0MTE3IDQzLDIxLjVjMCwyLjk3NDE3IDAsNy4xNjY2NyAwLDcuMTY2Njd6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" />
          </button>
        </MapControl>

        <MapControl position={google.maps.ControlPosition.RIGHT_BOTTOM}>
          <button
            style={{
              backgroundColor: '#8fa3bc',
              border: 'none',
              color: 'red',
              display: 'inline-block',
              marginBottom: '10px',
              marginRight: '10px',
              fontSize: '14px',
              borderRadius: '5px'
            }}
            onClick={() => this.state.onClear()}
          >
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iIGZpbGw9IiNmZmZmZmYiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggZD0iTTg2LDIxLjVjLTI3LjQ4Mzg5LDAgLTUwLjQzMjYxLDE2Ljk4NTg0IC01OS43OTY4Nyw0MC45ODQzOGw5LjkxMDE2LDQuMDMxMjVjNy44MzE1NCwtMjAuMDcyMjcgMjYuODMzMDEsLTM0LjI2NTYyIDQ5Ljg4NjcyLC0zNC4yNjU2MmMxNy40MjY3NiwwIDMyLjk2Mzg3LDguNTQ1NDEgNDIuNjY0MDYsMjEuNWgtMjEuMTY0MDZ2MTAuNzVoMzcuNjI1di0zNy42MjVoLTEwLjc1djE2LjYyODkxYy0xMS43Nzg4MSwtMTMuNTAwNDkgLTI5LjE4NDU3LC0yMi4wMDM5MSAtNDguMzc1LC0yMi4wMDM5MXpNMTM1Ljg4NjcyLDEwNS40ODQzOGMtNy44MzE1NCwyMC4wNzIyNyAtMjYuODMzMDEsMzQuMjY1NjMgLTQ5Ljg4NjcyLDM0LjI2NTYzYy0xNy42MTU3MiwwIC0zMy4wODk4NCwtOC42NzEzOSAtNDIuODMyMDMsLTIxLjVoMjEuMzMyMDN2LTEwLjc1aC0zNy42MjV2MzcuNjI1aDEwLjc1di0xNi42Mjg5MWMxMS43NTc4MSwxMy4zMzI1MiAyOC45OTU2LDIyLjAwMzkxIDQ4LjM3NSwyMi4wMDM5MWMyNy40ODM4OSwwIDUwLjQzMjYyLC0xNi45ODU4NCA1OS43OTY4OCwtNDAuOTg0Mzd6Ij48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+" />
          </button>
        </MapControl>
        <MapControl position={google.maps.ControlPosition.LEFT_TOP}>
          <MapFilter />
        </MapControl>
        <SearchBox
          ref={this.state.onSearchBoxMounted}
          bounds={this.props.bounds}
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
            // onClick={(event) => )}
            onDoubleClick={event =>
              event.target.setSelectionRange(0, event.target.value.length)
            }
          />
        </SearchBox>
        <MarkerView placesService={this.placesService} />
        <Marker
          icon={{
            path:
              'M21,3H3v18h6l3,3l3-3h6V3z M12,6c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S10.3,6,12,6z M18,18H6c0,0,0-0.585,0-1 c0-1.571,2.722-3,6-3s6,1.429,6,3C18,17.415,18,18,18,18z',
            strokeColor: 'black',
            fillColor: 'red',
            fillOpacity: 1,
            strokeOpacity: 0,
            scale: 1.3
          }}
          position={this.state.user}
        />
        <MarkerView />
        <RouteView />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MyMapComponent))
