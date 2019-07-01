import React, {useContext} from 'react'
import {StoreContext} from '../app'
import {DirectionsRenderer} from 'react-google-maps'
import {colorPicker} from '../utils/colorPicker'
import {directions} from '../utils/directions'
import {DELETE_SEGMENT} from '../hooks-store/segmentsReducer'
import {DELETE_FIRST_OR_LAST} from '../hooks-store/segmentsReducer'

export const RouteList = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <RouteLister
      segments={state.segments}
      placePreview={state.placePreview}
      dispatch={dispatch}
    />
  )
}

const RouteLister = props => {
  console.log('SEGMENTS: ', props.placePreview)
  return (
    <div>
      {props.placePreview[0] ? (
        <div>{props.placePreview[0].name}</div>
      ) : (
        <div>fill me in!</div>
      )}
      {props.segments &&
        (console.log('RENDERING', props.segments),
        props.segments.map((segment, index) => (
          <div style={{backgroundColor: colorPicker(index)}}>
            <div>{index}</div>
            <button
              type="button"
              onClick={async function() {
                console.log(props)
                if (
                  props.segments &&
                  (index === 0 || index === props.segments.length - 1)
                ) {
                  props.dispatch({type: DELETE_FIRST_OR_LAST, index: index})
                  // console.log(index)
                } else if (props.segments && props.segments.length > 2) {
                  directions(
                    props.segments[index].request.origin.placeId,
                    props.segments[index + 1].request.destination.placeId,
                    props.dispatch,
                    'WALKING',
                    DELETE_SEGMENT,
                    index
                  )
                }
              }}
            >
              X
            </button>
          </div>
        )))}
    </div>
  )
}

export default RouteList
