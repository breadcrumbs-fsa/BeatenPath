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
import {multiJourneys} from '../utils/multiJourneys'
import {
  PLACE_PREVIEW_TO_FIRST,
  PLACE_PREVIEW_TO_NTH
} from '../hooks-store/places/placesReducer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

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
    />
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1
    // maxWidth: 752,
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
  // if (location.pathname.match("/homepage")) {
  //   return null;
  // }

  function handleClick(index) {
    deletePlace(props.places, props.segments, index, props.dispatch)
  }

  function handleClickPreview() {
    props.dispatch({type: 'DELETE_PREVIEW'})
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
  return (
    <div>
      <FormGroup row />
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            {/* Avatar with text and icon */}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {props.journey.name && (
                <ListItem>
                  <ListItemText primary={props.journey.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        props.dispatch({type: 'CLEAR_PLACES'})
                        props.dispatch({
                          type: 'SET_SINGLE_JOURNEY',
                          journey: {}
                        })
                        props.dispatch({type: 'CHANGE_MODE', mode: 'find'})
                      }}
                      edge="end"
                      aria-label="arrow_back"
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
              <Divider />
              {props.places &&
                props.places
                  .slice()
                  .reverse()
                  .map((place, index) => (
                    <ListItem
                      key={index}
                      style={{
                        divider: true
                        // outline: `2px solid lightslategray`
                      }}
                    >
                      <ListItemIcon
                        style={{
                          color: colorPicker(props.places.length - 1 - index)
                        }}
                      >
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          place.name ? place.name : place.formatted_address
                        }
                        secondary={secondary ? 'Secondary text' : null}
                      />

                      <ListItemText
                        primary={place.types[0].replace('_', ' ')}
                        // primary={props.places[0].rating}
                        // primary={props.places[0].price_level}
                      />

                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() => handleClick(index)}
                          edge="end"
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(RouteList)
