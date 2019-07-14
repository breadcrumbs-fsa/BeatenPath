/* eslint-disable complexity */
import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/Folder'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Store} from '../app'
import {StoreContext} from '../app'
import {DirectionsRenderer} from 'react-google-maps'
import {colorPicker} from '../utils/colorPicker'
import {directions} from '../utils/directions'
import {deletePlace} from '../utils/deletePlace'
import {saveJourney} from '../utils/saveJourney'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {multiJourneys} from '../utils/multiJourneys'
import {
  PLACE_PREVIEW_TO_FIRST,
  PLACE_PREVIEW_TO_NTH
} from '../hooks-store/places/placesReducer'
import Divider from '@material-ui/core/Divider'
import Popover from '@material-ui/core/Popover'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const RouteList = () => {
  const [state, dispatch] = useContext(StoreContext)
  if (location.pathname.match('/homepage')) {
    return null
  }

  return (
    <RouteLister
      segments={state.segments}
      placePreview={state.placePreview}
      places={state.places}
      dispatch={dispatch}
      mode={state.mode}
      journey={state.journey}
      center={state.center}
      bounds={state.bounds}
    />
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

    // marginTop: '4px',
    // marginRight: '10px',
    // marginBottom: '4px',
    maxWidth: '180px',
    minWidth: '180px',
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: '0px',
    padding: '0px'
  },
  demo: {
    // backgroundColor: theme.palette.background.paper,
    // marginLeft: '15px'
    // marginTop: '-35px'
  },
  title: {
    // margin: theme.spacing(0, 0, 0)
    margin: theme.spacing(4, 0, 2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  typography: {
    padding: theme.spacing(2)
  },
  margin: {
    marginRight: '2px'
  },
  openClass: {
    color: '#388e3c'
  },
  noPadNoMarg: {
    padding: '0px 0px 0px 5px',
    margin: '0px',
    width: '360px'
  },
  topspace: {
    marginTop: '-35px',
    marginLeft: '15px'
  }
}))

// function generate(element) {
//   return [0, 1, 2].map(value =>
//     React.cloneElement(element, {
//       key: value
//     })
//   )
// }

const RouteLister = props => {
  const classes = useStyles()
  const [dense] = React.useState(false)
  const [secondary] = React.useState(false)
  const {location} = props
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  function handleClick(event) {
    deletePlace(props.places, props.segments, index, props.dispatch)
    setAnchorEl(event.currentTarget)
  }

  function handleClickPreview() {
    props.dispatch({type: 'DELETE_PREVIEW'})
  }

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }

  function handleClose() {
    setAnchorEl(null)
    setPopoverClick(false)
  }

  function handleAdd() {
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
  }

  const textSecondary = '#388e3c'
  const error = '#d32f2f'

  console.log('singlejourney props: ', props)
  // props.segments.length > 0 &&
  // console.log('center: ', props.segments[0].routes[0].bounds.getCenter())
  console.log('price level', props.places.price_level)

  return (
    <div>
      <FormGroup row />
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} />

          <div>
            <List dense={dense}>
              {props.journey.name && (
                <ListItem className={classes.topspace}>
                  <IconButton
                    onClick={() => {
                      props.dispatch({type: 'CLEAR_PLACES'})
                      props.dispatch({type: 'CLEAR_SEGMENTS'})
                      props.dispatch({
                        type: 'SET_SINGLE_JOURNEY',
                        journey: {}
                      })
                      props.dispatch({type: 'CHANGE_MODE', mode: 'find'})
                      props.dispatch({
                        type: 'SET_FIT_BOUNDS',
                        fitBounds: 'notFit'
                      })
                    }}
                    // edge="end"
                    aria-label="arrow_back"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <ListItemText primary={props.journey.name} />

                  {props.mode === 'viewOnly' && (
                    <IconButton
                      // variant="contained"
                      // color="primary"
                      // className={classes.button}
                      onClick={function() {
                        props.dispatch({type: 'CHANGE_MODE', mode: 'create'})
                      }}
                    >
                      <Icon>edit_icon</Icon>
                    </IconButton>
                  )}
                  <ListItemSecondaryAction />
                </ListItem>
              )}

              <Divider />
              {props.places &&
                props.places
                  .slice()
                  .reverse()
                  .map((place, index) => {
                    console.log(
                      'PRICE: ',
                      place.price_level,
                      place.price_level == 0
                    )
                    return (
                      <ListItem
                        key={index}
                        className={classes.noPadNoMarg}
                        style={{
                          divider: true,
                          margin: '0px'
                        }}
                      >
                        {/* <ListItemIcon
                          style={{
                            color: colorPicker(props.places.length - 1 - index)
                          }}
                        >
                          <LocationOnIcon />
                        </ListItemIcon> */}

                        <ExpansionPanel
                          expanded={expanded === index}
                          onChange={handleChange(index)}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className={classes.noPadNoMarg}
                            style={{width: '210 px'}}
                          >
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                            >
                              <img
                                width="auto"
                                height="30 rem"
                                src={`/markernums${props.places.length -
                                  index}.png`}
                                style={{paddingRight: '1rem'}}
                              />

                              <Typography>
                                {place.name
                                  ? place.name
                                  : place.formatted_address}
                              </Typography>
                            </Grid>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid className={classes.root}>
                              {place.opening_hours &&
                                (place.opening_hours.open_now ? (
                                  <Typography
                                    color="textSecondary"
                                    className={classes.openClass}
                                  >
                                    Open Now
                                  </Typography>
                                ) : (
                                  <Typography color="error">Closed</Typography>
                                ))}
                              {place.types && (
                                <Typography>
                                  {place.types[0][0].toUpperCase() +
                                    place.types[0]
                                      .split('_')
                                      .join(' ')
                                      .slice(1)}
                                </Typography>
                              )}
                              {place.rating && (
                                <Typography>
                                  Rating: {place.rating}{' '}
                                  {'⭐️'.repeat(Math.round(place.rating))}{' '}
                                </Typography>
                              )}
                              {typeof place.price_level === 'number' &&
                                (place.price_level != 0 ? (
                                  <Typography>
                                    Price: {'$'.repeat(place.price_level)}
                                  </Typography>
                                ) : (
                                  <Typography>Price: Free!</Typography>
                                ))}
                              <Grid />
                              {place.photos && (
                                <Grid>
                                  <div
                                    style={{
                                      overflowX: 'auto',
                                      width: '210px',
                                      display: 'flex'
                                    }}
                                  >
                                    {place.photos.map((photo, index) => {
                                      const imageURL = photo.getUrl()
                                      if (imageURL) {
                                        return (
                                          <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="baseline"
                                            style={{paddingRight: '.3rem'}}
                                          >
                                            <img
                                              key={index}
                                              // width="auto"
                                              height="100 rem"
                                              src={imageURL}
                                              margin="10 px"
                                              style={{margin: '10 rem'}}
                                            />
                                          </Grid>
                                        )
                                      }
                                    })}
                                  </div>
                                </Grid>
                              )}
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {props.mode === 'create' && (
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() =>
                                deletePlace(
                                  props.places,
                                  props.segments,
                                  index,
                                  props.dispatch
                                )
                              }
                              aria-label="Delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    )
                  })}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(RouteList)
