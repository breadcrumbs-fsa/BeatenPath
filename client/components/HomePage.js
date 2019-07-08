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
    <div style={{backgroundImage: `url('/map4.jpg')`, height: '95vh'}}>
      <Box
        height="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* // find all journeys  */}
        <Button
          variant="contained"
          // size="large"
          color="primary"
          className={classes.button}
          // onClick={function() {
          //   setMode('find')
          //   modeFlag === 'find' &&
          //     (multiJourneys(props.dispatch),
          //     // console.log('first props: ', props.journeys)
          //     props.journeys.forEach(journey => {
          //       journey.segments.forEach(segment => {
          //         directions(
          //           segment.segmentStart,
          //           segment.segmentEnd,
          //           props.dispatch
          //         )
          //       })
          //     }))
          // }}
        >
          Find Your Path
        </Button>

        <Button
          variant="contained"
          color="secondary"
          // size="large"
          className={classes.button}
          // onClick={function() {
          //   setMode('create'),
          //   modeFlag === 'create'
          //   if (props.places.length === 0) {
          //     props.dispatch({
          //       type: PLACE_PREVIEW_TO_FIRST,
          //       place: props.placePreview[0]
          //     })
          //   } else if (props.places.length > 0) {
          //     props.dispatch({
          //       type: PLACE_PREVIEW_TO_NTH,
          //       place: props.placePreview[0]
          //     })
          //     directions(
          //       props.places[props.places.length - 1].place_id,
          //       props.placePreview[0].place_id,
          //       props.dispatch,
          //       'WALKING',
          //       'ADD_SEGMENT_1'
          //     )
          //   }
          // }}
        >
          Create Your Path
        </Button>

        {/* <Button
        onClick={() => testClick()}
      >
        Test
      </Button>
      {modeFlag=='test' ? <div>hello!</div> : <div>goodbye</div>} */}
      </Box>
    </div>
  )
}

export default HomePage
