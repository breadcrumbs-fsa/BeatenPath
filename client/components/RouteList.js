import React, {useContext} from 'react'
import {StoreContext} from '../app'
import {DirectionsRenderer} from 'react-google-maps'
import {colorPicker} from '../utils/colorPicker'
import {directions} from '../utils/directions'
import {DELETE_SEGMENT} from '../hooks-store/segments/segmentsReducer'
import {DELETE_FIRST_OR_LAST} from '../hooks-store/segments/segmentsReducer'

export const RouteList = () => {
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

const RouteLister = props => {
  return (
    <div>
      {props.placePreview[0] ? (
        <div style={{backgroundColor: colorPicker(-1)}}>
          {props.placePreview[0].name}
        </div>
      ) : (
        <div style={{backgroundColor: colorPicker(-1)}}>fill me in!</div>
      )}
      {props.places &&
        props.places
          .slice()
          .reverse()
          .map((place, index) => (
            <div key={index} style={{backgroundColor: colorPicker(index)}}>
              <div>{place.name}</div>
            </div>
          ))}
    </div>
  )
}

export default RouteList

//
// <button
//   type="button"
//   onClick={async function() {
//     if (
//       props.segments &&
//       (index === 0 || index === props.segments.length - 1)
//     ) {
//       props.dispatch({type: DELETE_FIRST_OR_LAST, index: index})
//     } else if (props.segments && props.segments.length > 2) {
//       directions(
//         props.segments[index].request.origin.placeId,
//         props.segments[index + 1].request.destination.placeId,
//         props.dispatch,
//         'WALKING',
//         DELETE_SEGMENT,
//         index
//       )
//     }
//   }}
// >
//   X
// </button>
