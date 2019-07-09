import React, {useContext, useEffect} from 'react'
import {StoreContext} from '../app'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import MapIcon from '@material-ui/icons/Map'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {singleJourneyPlaces} from '../utils/singleJourneyPlaces'
import ListItemText from '@material-ui/core/ListItemText'

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'

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
            <ListItem
              key={journey.id}
              style={{
                divider: true,
                outline: `2px solid lightslategray`
              }}
            >
              <ListItemText primary={journey.name} />

              {/* <ListItemText
                  primary={props.places[0].price_level}
                /> */}

              <IconButton
                onClick={() =>
                  singleJourneyPlaces(
                    journey.segments,
                    props.placesService,
                    props.dispatch
                  )
                }
                aria-label="map"
              >
                <MapIcon />
              </IconButton>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    singleJourneyPlaces(
                      journey.segments,
                      props.placesService,
                      props.dispatch
                    )
                    props.dispatch({
                      type: 'SET_SINGLE_JOURNEY',
                      journey: journey
                    })
                    props.dispatch({type: 'CHANGE_MODE', mode: 'viewOnly'})
                  }}
                  edge="end"
                  aria-label="arrow_forward"
                >
                  <ArrowForwardIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            // <ButtonGroup
            //   fullWidth
            //   aria-label="Full width outlined button group"
            //   key={journey.id}
            // >
            // <Button
            //   type="button"
            //   onClick={function() {
            //     singleJourneyPlaces(
            //       journey.segments,
            //       props.placesService,
            //       props.dispatch
            //     )
            //   }}
            // >
            //     {journey.name} {journey.segments.length + 1}
            //   </Button>
            // </ButtonGroup>
          ))}
      </Grid>
    </div>
  )
}

export default JourneyList
