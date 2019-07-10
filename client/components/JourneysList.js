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

import {addCenter} from '../hooks-store/search/centerReducer'
import {addBounds} from '../hooks-store/search/boundsReducer'

export const JourneyList = () => {
  const [state, dispatch] = useContext(StoreContext)

  return (
    <JourneyListView
      state={state}
      journeys={state.journeys}
      dispatch={dispatch}
      placesService={state.placesService}
      center={state.center}
      segments={state.segments}
      places={state.places}
      bounds={state.bounds}
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
  console.log('journeylist props: ', props)
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
              <ListItemText
                primary={(
                  journey.segments.reduce(
                    (accum, currentSeg) => accum + currentSeg.distance,
                    0
                  ) / 1609.344
                ).toFixed(1)}
              />

              <IconButton
                onClick={async () => {
                  props.dispatch({type: 'CLEAR_PLACES'})
                  props.dispatch({type: 'DELETE_PREVIEW'})
                  props.dispatch({type: 'CLEAR_SEGMENTS'})
                  await singleJourneyPlaces(
                    journey.segments,
                    props.placesService,
                    props.dispatch,
                    props.state
                  )

                  await props.dispatch(
                    addBounds(props.segments[0].routes[0].bounds)
                  )
                }}
                aria-label="map"
              >
                <MapIcon />
              </IconButton>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    props.dispatch({type: 'CLEAR_PLACES'})
                    props.dispatch({type: 'DELETE_PREVIEW'})
                    props.dispatch({type: 'CLEAR_SEGMENTS'})
                    singleJourneyPlaces(
                      journey.segments,
                      props.placesService,
                      props.dispatch,
                      props.state
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
          ))}
      </Grid>
    </div>
  )
}

export default JourneyList
