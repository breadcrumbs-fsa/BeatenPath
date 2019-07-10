import React, {useContext, useEffect} from 'react'
import Map from '../client/components/Map'
import '../secrets'
import {StoreContext} from '../client/app'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
const mapkey = process.env.GOOGLE_MAPJS_API
import {directions} from '../client/utils/directions'
import {saveJourney} from '../client/utils/saveJourney'
import {multiJourneys} from '../client/utils/multiJourneys'
import {
  DELETE_FIRST_OR_LAST,
  DELETE_SEGMENT
} from '../client/hooks-store/segments/segmentsReducer'
import {
  PLACE_PREVIEW_TO_FIRST,
  PLACE_PREVIEW_TO_NTH
} from '../client/hooks-store/places/placesReducer'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import TextField from '@material-ui/core/TextField'
import {fetchSingleJourney} from '../client/utils/fetchSingleJourney'
import {singleJourneyPlaces} from '../client/utils/singleJourneyPlaces'
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
            // event.preventDefault()
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

        {props.journeys.length > 0 &&
          props.journeys.map(journey => (
            <ButtonGroup
              fullWidth
              aria-label="Full width outlined button group"
              key={journey.id}
            >
              <Button
                type="button"
                onClick={function() {
                  singleJourneyPlaces(
                    journey.segments,
                    props.placesService,
                    props.dispatch
                  )
                }}
              >
                {journey.name} {journey.segments.length + 1}
              </Button>
            </ButtonGroup>
          ))}

        <ButtonGroup fullWidth aria-label="Full width outlined button group">
          {/* <Button
            type="button"
            onClick={function() {
              props.dispatch({type: 'CLEAR_PLACES'})
            }}
          >
            Start New Journey / CLEAR MAP
          </Button> */}
        </ButtonGroup>
      </Grid>
    </div>
  )
}

export default CommandBar
