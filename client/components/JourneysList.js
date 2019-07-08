import React, {useContext, useEffect} from 'react'
import {StoreContext} from '../app'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {singleJourneyPlaces} from '../utils/singleJourneyPlaces'
import ArrowForwardIcon from 'material-design-icons/ArrowForward'
import {ListItemIcon} from '@material-ui/core'

export const JourneyList = () => {
  const [state, dispatch] = useContext(StoreContext)

  return (
    <JourneyListView
      journeys={state.journeys}
      dispatch={dispatch}
      placesService={state.placesService}
    />
  )
}

export const JourneyListView = props => {
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
  return (
    <div>
      <Grid>
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
      </Grid>
    </div>
  )
}

export default JourneyList
