import React, {useContext} from 'react'
import Map from './Map'
import '../../secrets'
import {StoreContext} from '../app'
const mapkey = process.env.GOOGLE_MAPJS_API
import {directions} from '../utils/directions'
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



export const CommandBar = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <CommandBarView
      segments={state.segments}
      dispatch={dispatch}
      placePreview={state.placePreview}
      places={state.places}
    />
  )
}

const CommandBarView = props => {
  return (
    <div>
          <Grid item xs={12}>
      <ButtonGroup fullWidth aria-label="Full width outlined button group">
        <Button type="button"
        disabled={props.placePreview.length === 0}
        onClick={function() {
          if (props.places.length === 0) {
            props.dispatch({
              type: PLACE_PREVIEW_TO_FIRST,
              place: props.placePreview[0]
            })
          } else if (props.places.length > 0) {
            directions(
              props.places[props.places.length - 1].place_id,
              props.placePreview[0].place_id,
              props.dispatch,
              'WALKING',
              'ADD_SEGMENT_1'
            )
            props.dispatch({
              type: PLACE_PREVIEW_TO_NTH,
              place: props.placePreview[0]
            })
          }
        }}>Add to journey</Button>
        {/* <Button>width</Button>
          <Button>ButtonGroup</Button> */}
      </ButtonGroup>
    </Grid>
    </div>
  )
}

export default CommandBar
