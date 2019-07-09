import React, {useContext, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {multiJourneys} from '../utils/multiJourneys'
import '../../secrets'
import {StoreContext} from '../app'
import {directions} from '../utils/directions'
import {flexbox} from '@material-ui/system'
import Box from '@material-ui/core/Box'
import {
  PLACE_PREVIEW_TO_FIRST,
  PLACE_PREVIEW_TO_NTH
} from '../hooks-store/places/placesReducer'
import {renderComponent} from 'recompose'
const mapkey = process.env.GOOGLE_MAPJS_API

// import {fetchSingleJourney} from '../utils/fetchSingleJourney'

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
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}))

export const HomePageView = props => {
  const [modeFlag, setMode] = useState('')

  // function testClick() {
  //   console.log(modeFlag)
  //   setMode('test')
  //   console.log(modeFlag)
  // }

  // function clickHandler() {
  //   setMode()
  // }

  const classes = useStyles()
  // const map = mapBackground

  return (
    <div style={{backgroundImage: `url('/bookMap3.jpg')`, height: '95vh'}}>
      <Box
        height="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          // size="large"
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
          // size="large"
          className={classes.button}
          onClick={function() {
            props.dispatch({type: 'CHANGE_MODE', mode: 'create'})
            props.dispatch({type: 'CLEAR_PLACES'})
            props.dispatch({type: 'CLEAR_SEGMENTS'})
            props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
          }}
        >
          Create Your Path
        </Button>
      </Box>
    </div>
  )
}

export default HomePage
