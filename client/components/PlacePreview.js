import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
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
import {Store} from '../app'
import {StoreContext} from '../app'
import {DirectionsRenderer} from 'react-google-maps'
import {colorPicker} from '../utils/colorPicker'
import {directions} from '../utils/directions'
import {deletePlace} from '../utils/deletePlace'
import {saveJourney} from '../utils/saveJourney'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import {multiJourneys} from '../utils/multiJourneys'
import {
  PLACE_PREVIEW_TO_FIRST,
  PLACE_PREVIEW_TO_NTH
} from '../hooks-store/places/placesReducer'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

export const PlacePreview = () => {
  const [state, dispatch] = useContext(StoreContext)

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
    leftMargin: '15px'
    // topMargin: '-30px'
    // flexGrow: 1
    // maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 270,
    topMargin: 0,
    leftMargin: '15px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    marginBottom: '-60px',
    marginLeft: '20px',
    marginTop: '-20px'
  },
  left: {
    marginLeft: '15px'
  }
  // title: {
  //   margin: theme.spacing(0, 0, 0)
  // }
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
  const [values, setValues] = React.useState({
    title: ''
  })
  const [saved, setSaved] = React.useState(false)
  const handleChange = name => event => {
    console.log('event on handlechange', event)
    setValues({...values, [name]: event.target.value})
  }

  function handleClick(index) {
    deletePlace(props.places, props.segments, index, props.dispatch)
  }
  function handleClickPreview() {
    props.dispatch({type: 'DELETE_PREVIEW'})
  }

  function handleAdd() {
    if (props.places.length === 0) {
      console.log(props.places.length)
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
    <div className={classes.root}>
      {/* <FormGroup row /> */}
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            {/* Avatar with text and icon */}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {props.placePreview[0] ? (
                <ListItem
                // style={{
                //   outline: `2px solid lightslategray `
                // }}
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
                      onClick={() => handleAdd()}
                      edge="end"
                      aria-label="Add"
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>

                  {/*<ListItemSecondaryAction>*/}
                  {/*  <IconButton*/}
                  {/*    onClick={() => handleClickPreview()}*/}
                  {/*    edge="false"*/}
                  {/*    aria-label="Delete"*/}
                  {/*  >*/}
                  {/*    <DeleteIcon />*/}
                  {/*  </IconButton>*/}
                  {/*</ListItemSecondaryAction>*/}
                </ListItem>
              ) : (
                <ListItem
                // style={{
                //   outline: `1px solid gainsboro`

                // }}
                >
                  <ListItemText
                    style={{
                      color: 'silver',
                      fontStyle: 'italic'
                    }}
                    primary="Use the search box above to add a place!"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              )}
              {/* <FormControlLabel classes={label.left}>  */}
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={event => {
                  console.log(event)
                  event.preventDefault()
                }}
              >
                <TextField
                  id="standard-name"
                  label="Title"
                  value={values.title}
                  className={classes.textField}
                  margin="normal"
                  onChange={handleChange('title')}
                />
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.button}
                  onClick={() => {
                    saveJourney(values.title, props.segments, props.dispatch)
                    setSaved(true)
                  }}
                >
                  Save
                </Button>
                {saved === true && (
                  <span style={{marginLeft: '13px', color: 'green'}}>
                    Saved!
                  </span>
                )}
              </form>

              {/* <form
                onSubmit={event => {
                  event.preventDefault()
                  saveJourney(
                    event.target.content.value,
                    props.segments,
                    props.dispatch
                  )
                }}
              >
                <div>
                  <input
                    type="text"
                    name="content"
                    placeholder="Untitled Journey"
                  />
                  <button type="submit">Save</button>
                </div>
              </form> */}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
