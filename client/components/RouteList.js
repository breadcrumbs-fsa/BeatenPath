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
import {Store} from '../app'
import {StoreContext} from '../app'
import {DirectionsRenderer} from 'react-google-maps'
import {colorPicker} from '../utils/colorPicker'
import {directions} from '../utils/directions'
import {deletePlace} from '../utils/deletePlace'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
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
    />
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    // maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
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
  console.log('shtuff ', props)
  // console.log('place stuff: ', props.places[0].rating)
  // console.log('place stuff: ', props.places.reviews[0].text)
  // console.log('price ', props.places.plus_code.price_level)
  return (
    <div className={classes.root}>
      <FormGroup row />
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            {/* Avatar with text and icon */}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense} style={{marginBottom: '4px'}}>
              {props.placePreview[0] ? (
                <ListItem
                  style={{
                    outline: `2px solid ${colorPicker(-1)} `,
                    marginBottom: '4px'
                  }}
                >
                  <ListItemIcon style={{color: colorPicker(-1)}}>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      props.placePreview[0].name
                        ? props.placePreview[0].name
                        : props.placePreview[0].formatted_address
                    }
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemText
                    primary={props.placePreview[0].types[0].replace('_', ' ')}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => handleClickPreview()}
                      edge="end"
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                <ListItem
                  style={{
                    // outline: `2px solid ${colorPicker(-1)} `,
                    marginBottom: '4px'
                  }}
                >
                  <ListItemText
                    primary="Add a place!"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              )}
              {props.places &&
                props.places
                  .slice()
                  .reverse()
                  .map((place, index) => (
                    <ListItem
                      key={index}
                      style={{
                        outline: '2px solid lightgray',
                        marginBottom: '4px'
                      }}
                    >
                      <ListItemIcon style={{color: colorPicker(index)}}>
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

                      {/* <ListItemText
                  primary={props.places[0].price_level}
                /> */}

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
