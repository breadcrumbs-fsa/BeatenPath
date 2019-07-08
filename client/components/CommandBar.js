import React, {useContext, useEffect} from 'react'
import Map from './Map'
import '../../secrets'
import {StoreContext} from '../app'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
const mapkey = process.env.GOOGLE_MAPJS_API
import {directions} from '../utils/directions'
import {saveJourney} from '../utils/saveJourney'
import {multiJourneys} from '../utils/multiJourneys'
import {
  DELETE_FIRST_OR_LAST,
  DELETE_SEGMENT
} from '../hooks-store/segments/segmentsReducer'
import {
  PLACE_PREVIEW_TO_FIRST,
  PLACE_PREVIEW_TO_NTH
} from '../hooks-store/places/placesReducer'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import TextField from '@material-ui/core/TextField'
import {fetchSingleJourney} from '../utils/fetchSingleJourney'
import axios from 'axios'

export const CommandBar = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <CommandBarView
      segments={state.segments}
      dispatch={dispatch}
      placePreview={state.placePreview}
      places={state.places}
      journeys={state.journeys}
      journey={state.journey}
      placesService={state.placesService}
    />
  )
}

// useEffect with props.journey

const CommandBarView = props => {
  useEffect(() => {
    async function fetchJourney(
      journeyId,
      dispatch,
      dispatchType = 'SET_SINGLE_JOURNEY'
    ) {
      try {
        const {data: singleJourney} = await axios.get(
          `/api/journeys/${journeyId}`
        )
        dispatch({
          type: dispatchType,
          journey: singleJourney
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchJourney(2, props.dispatch)
  }, [])

  useEffect(() => {
    async function fetchMultiJourneys(
      dispatch,
      dispatchType = 'GET_MULTIPLE_JOURNEYS'
    ) {
      try {
        const {data: multipleJourneys} = await axios.get('/api/journeys')
        dispatch({
          type: dispatchType,
          journeys: multipleJourneys
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchMultiJourneys(props.dispatch)
  }, [])

  console.log('journeys: ', props.journeys)
  return (
    <div>
      <Grid item xs={12}>
        <ButtonGroup fullWidth aria-label="Full width outlined button group">
          <Button
            type="button"
            disabled={props.placePreview.length === 0}
            onClick={function() {
              if (props.places.length === 0) {
                props.dispatch({
                  type: PLACE_PREVIEW_TO_FIRST,
                  place: props.placePreview[0]
                })
              } else if (props.places.length > 0) {
                props.dispatch({
                  type: PLACE_PREVIEW_TO_NTH,
                  place: props.placePreview[0]
                })
                directions(
                  props.places[props.places.length - 1].place_id,
                  props.placePreview[0].place_id,
                  props.dispatch,
                  'WALKING',
                  'ADD_SEGMENT_1'
                )
              }
            }}
          >
            Add to journey
          </Button>
        </ButtonGroup>
        <form
          onSubmit={event => {
            event.preventDefault()
            saveJourney(
              event.target.content.value,
              props.segments,
              props.dispatch
            )
          }}
        >
          <div>
            <input type="text" name="content" placeholder="Untitled Journey" />
            <button type="submit">Save</button>
          </div>
        </form>
        <ButtonGroup fullWidth aria-label="Full width outlined button group">
          <Button
            type="button"
            onClick={function() {
              props.journeys.forEach(journey => {
                journey.segments.forEach(segment => {
                  console.log('each seg:   ', segment)
                  directions(
                    segment.segmentStart,
                    segment.segmentEnd,
                    props.dispatch
                  )
                })
              })
            }}
          >
            View All Journeys
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth aria-label="Full width outlined button group">
          <Button
            type="button"
            onClick={async function() {
              props.journey.segments.forEach(segment =>
                directions(
                  segment.segmentStart,
                  segment.segmentEnd,
                  props.dispatch
                )
              )
              let placeIdArray = []
              if (props.journey.segments.length > 0) {
                placeIdArray.push(
                  props.journey.segments[0].segmentStart,
                  props.journey.segments[0].segmentEnd
                )
                if (props.journey.segments.length > 1) {
                  if (props.journey.segments.length > 2) {
                    for (
                      let i = 1;
                      i < props.journey.segments.length - 1;
                      i++
                    ) {
                      placeIdArray.push(props.journey.segments[i].segmentEnd)
                    }
                  }
                  placeIdArray.push(
                    props.journey.segments[props.journey.segments.length - 1]
                      .segmentEnd
                  )
                }
                // placeIdArray.reverse()
                const placesPromises = placeIdArray.map(placeID => {
                  let executor = (resolve, reject) =>
                    props.placesService.getDetails(
                      {placeId: placeID},
                      (results, status) => {
                        if (
                          status == google.maps.places.PlacesServiceStatus.OK
                        ) {
                          resolve(results)
                        } else {
                          reject(status)
                          console.log('placesQuery Failed: ', status)
                        }
                      }
                    )
                  return new Promise(executor)
                })

                try {
                  const placesArray = await Promise.all(placesPromises)
                  await props.dispatch({
                    type: 'ADD_PLACES_ARRAY',
                    places: placesArray
                  })
                } catch (error) {
                  console.log(error)
                }
              }
            }}
          >
            View Date Night
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth aria-label="Full width outlined button group">
          <Button
            type="button"
            onClick={function() {
              props.dispatch({type: 'CLEAR_PLACES'})
            }}
          >
            Start New Journey / CLEAR MAP
          </Button>
        </ButtonGroup>
      </Grid>
    </div>
  )
}

export default CommandBar
