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

    marginTop: '4px',
    marginRight: '10px',
    marginBottom: '4px',
    maxWidth: '190px',
    minWidth: '190px',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  demo: {
    backgroundColor: theme.palette.background.paper
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
  const [popoverClick, setPopoverClick] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
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

  console.log('singlejourney props: ', props)
  // props.segments.length > 0 &&
  // console.log('center: ', props.segments[0].routes[0].bounds.getCenter())
  console.log('places ', props.places)
  return (
    <div>
      <FormGroup row />
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} />

          <div className={classes.demo}>
            <List dense={dense}>
              {props.journey.name && (
                <ListItem>
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
                    return (
                      <ListItem
                        key={index}
                        style={{
                          divider: true
                          // outline: `2px solid lightslategray`
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
                          >
                            <Grid className={classes.root}>
                              <ListItemIcon
                                style={{
                                  color: colorPicker(
                                    props.places.length - 1 - index
                                  )
                                }}
                              >
                                <LocationOnIcon />
                              </ListItemIcon>
                              <Typography>
                                {place.name
                                  ? place.name
                                  : place.formatted_address}
                              </Typography>
                            </Grid>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid className={classes.root}>
                              <Typography>
                                {place.types[0][0].toUpperCase() +
                                  place.types[0]
                                    .split('_')
                                    .join(' ')
                                    .slice(1)}
                              </Typography>
                              <Typography>
                                Rating: {place.rating}{' '}
                                {'⭐️'.repeat(Math.round(place.rating))}{' '}
                              </Typography>
                              {place.price_level && (
                                <Typography>
                                  Price: {'$'.repeat(place.price_level)}
                                </Typography>
                              )}
                              <Grid />
                              {place.photos.map(photo => (
                                <img
                                  key={photo.getUrl()}
                                  width="auto"
                                  height="100 rem"
                                  src={photo.getUrl()}
                                />
                              ))}
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
                              edge="end"
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
