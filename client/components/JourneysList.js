import React, {useContext, useEffect} from 'react'
import {StoreContext} from '../app'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import MapIcon from '@material-ui/icons/Map'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import IconButton from '@material-ui/core/IconButton'
import {singleJourneyPlaces} from '../utils/singleJourneyPlaces'
import ListItemText from '@material-ui/core/ListItemText'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import {makeStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // maxWidth: 752
    marginLeft: '10px',
    marginRight: '10px'
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    fontSize: '18px'
    // margin: theme.spacing(4, 0, 2)
  },
  floatLeft: {
    display: 'inline',
    float: 'left'
  },
  floatRight: {
    display: 'inline',
    float: 'right'
  },
  placeText: {
    height: '48px',
    display: 'inline',
    float: 'left',
    font: '30px sans-serif'
  },

  clearBoth: {
    clear: 'both',
    padding: '-2px'
  },
  gridWidth: {
    width: '100%'
  }
}))

export const JourneyListView = props => {
  const classes = useStyles()

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
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.gridWidth}>
        <Grid className={classes.gridWidth}>
          <div className={classes.root}>
            {/* <List dense={dense}></List> */}

            {props.journeys.length > 0 &&
              props.journeys.map(journey => (
                <List key={journey.id} className={classes.clearBoth}>
                  <h1 />
                  <Typography className={classes.title}>
                    {journey.name}
                  </Typography>
                  {/* distance number */}
                  <ListItemText
                    className={classes.placeText}
                    primary={(
                      journey.segments.reduce(
                        (accum, currentSeg) => accum + currentSeg.distance,
                        0
                      ) / 1609.344
                    ).toFixed(1)}
                  />
                  <ListItemText
                    style={{
                      height: '48px',
                      display: 'inline',
                      float: 'left',
                      marginLeft: '4px',
                      font: '30px sans-serif'
                    }}
                  >
                    miles
                  </ListItemText>

                  {/* <ListItemText
                  primary={props.places[0].price_level}
                /> */}
                  <div className={classes.floatRight}>
                    {/* Map button */}
                    <ListItemIcon className={classes.floatLeft}>
                      <IconButton
                        onClick={async () => {
                          props.dispatch({
                            type: 'SET_FIT_BOUNDS',
                            fitBounds: 'notFit'
                          })
                          props.dispatch({type: 'CLEAR_PLACES'})
                          props.dispatch({type: 'DELETE_PREVIEW'})
                          props.dispatch({type: 'CLEAR_SEGMENTS'})
                          singleJourneyPlaces(
                            journey.segments,
                            props.placesService,
                            props.dispatch,
                            props.state
                          )
                        }}
                        aria-label="map"
                      >
                        <MapIcon style={{color: '#339966'}} />
                      </IconButton>
                    </ListItemIcon>
                    {/* </ListItem> */}
                    {/* Arrow button */}
                    <div className={classes.floatLeft}>
                      <IconButton
                        onClick={async () => {
                          props.dispatch({
                            type: 'SET_FIT_BOUNDS',
                            fitBounds: 'notFit'
                          })
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
                          props.dispatch({
                            type: 'CHANGE_MODE',
                            mode: 'viewOnly'
                          })
                        }}
                        edge="end"
                        aria-label="arrow_forward"
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Divider style={{width: '100%'}} />
                </List>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default JourneyList
