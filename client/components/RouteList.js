import React, {useContext} from 'react'
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
import {DirectionsRenderer} from 'react-google-maps'
import {colorPicker} from '../utils/colorPicker'
import {directions} from '../utils/directions'
import {DELETE_SEGMENT} from '../hooks-store/segmentsReducer'
import {DELETE_FIRST_OR_LAST} from '../hooks-store/segmentsReducer'

export const RouteList = () => {
  const [state, dispatch] = useContext(Store)
  return <RouteLister segments={state.segments} dispatch={dispatch} />
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
  }
}))

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  )
}

const RouteLister = props => {
  const classes = useStyles()
  const [dense] = React.useState(false)
  const [secondary] = React.useState(false)

  return (
    <div className={classes.root}>
      <FormGroup row />

      {/* <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Icon with text
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </div>
        </Grid> */}
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            {/* Avatar with text and icon */}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  {/* <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar> */}
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

// const RouteLister = props => {
//   // console.log('SEGMENTS: ', props.segments)
//   return (
//     <div>
//       {props.segments &&
//         (console.log('RENDERING', props.segments),
//         props.segments.map((segment, index) => (
//           <div style={{backgroundColor: colorPicker(index)}}>

//             <div>hello {index}</div>
//             <button
//               type="button"
//               onClick={async function() {
//                 console.log(props)
//                 if (
//                   props.segments &&
//                   (index === 0 || index === props.segments.length - 1)
//                 ) {
//                   props.dispatch({type: DELETE_FIRST_OR_LAST, index: index})
//                   // console.log(index)
//                 } else if (props.segments && props.segments.length > 2) {
//                   directions(
//                     props.segments[index].request.origin.placeId,
//                     props.segments[index + 1].request.destination.placeId,
//                     props.dispatch,
//                     'WALKING',
//                     DELETE_SEGMENT,
//                     index
//                   )
//                 }
//               }}
//             >
//               X
//             </button>
//           </div>
//         )))}
//     </div>
//   )
// }

export default RouteList
