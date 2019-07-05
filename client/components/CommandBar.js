import React, {useContext} from 'react'
import Map from './Map'
import '../../secrets'
import {StoreContext} from '../app'
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

export const CommandBar = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <CommandBarView
      segments={state.segments}
      dispatch={dispatch}
      placePreview={state.placePreview}
      places={state.places}
      journeys={state.journeys}
    />
  )
}

const CommandBarView = props => {
  console.log('command bar journeys: ', props.journeys)
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
          {/* <Button>width</Button>
          <Button>ButtonGroup</Button> */}
        </ButtonGroup>
        <form
          onSubmit={event =>
            saveJourney(event.target.content.value, props.segments)
          }
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
              multiJourneys(props.dispatch)
              props.journeys.map(journey => {
                console.log('journey: ', journey)
                return journey.segments.map(segment => {
                  console.log('segment: ', segment)
                  return directions(
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
          {/* <Button>width</Button>
          <Button>ButtonGroup</Button> */}
        </ButtonGroup>
      </Grid>
    </div>
  )
}

export default CommandBar
