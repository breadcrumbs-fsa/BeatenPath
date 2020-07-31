import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import '../../secrets'
import {StoreContext} from '../app'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

export const HomePage = () => {
  const [state, dispatch] = useContext(StoreContext)

  return (
    <HomePageView
      segments={state.segments}
      dispatch={dispatch}
      placePreview={state.placePreview}
      places={state.places}
      journeys={state.journeys}
      journey={state.journey}
      mode={state.mode}
    />
  )
}

// function createClicked

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#a4bb99',
    color: '#303f50'
  },
  button2: {
    margin: theme.spacing(1),
    backgroundColor: '#f19367',
    color: '#303f50',
    marginBottom: theme.spacing(32)
  },
  input: {
    display: 'none'
  },
  // root: {
  //   flexGrow: 1
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export const HomePageView = props => {
  const classes = useStyles()

  return (
    <div
      style={{
        backgroundImage: `url('/2perfectmap.png')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 96.5vh',
        backgroundColor: '#F4F3EE'
      }}
    >
      <Box
        height="96.5vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* // find all journeys  */}
        <Grid container direction="column" alignItems="center">
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={function() {
              props.dispatch({type: 'CHANGE_MODE', mode: 'find'})
            }}
          >
            Find Your Path
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button2}
            onClick={function() {
              props.dispatch({type: 'CHANGE_MODE', mode: 'create'})
              props.dispatch({type: 'CLEAR_PLACES'})
              props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
            }}
          >
            Create Your Path
          </Button>
        </Grid>
      </Box>
    </div>
  )
}

export default HomePage
