/* eslint-disable complexity */
export const ADD_SEGMENT_1 = 'ADD_SEGMENT_1'
export const DELETE_PLACE = 'DELETE_PLACE'
export const DELETE_FIRST_OR_LAST = 'DELETE_FIRST_OR_LAST'
export const CLEAR_PLACES = 'CLEAR_PLACES'

export const addSegment1 = segment => ({
  type: ADD_SEGMENT_1,
  segment
})

export const allSegments = journeyId => ({
  type: ALL_SEGMENTS,
  journeyId
})

export const placePreviewToNth = segment => ({
  type: ADD_SEGMENT_1,
  segment
})
export const deletePlace = (segment, index) => ({
  type: DELETE_PLACE,
  segment,
  index
})

export const deleteFirstOrLast = index => ({
  type: DELETE_FIRST_OR_LAST,
  index
})

export const clearPlaces = () => ({
  type: CLEAR_PLACES
})

const segmentReducer = (segmentState, action) => {
  switch (action.type) {
    case ADD_SEGMENT_1:
      return [...segmentState, action.segment]

    case DELETE_PLACE:
      console.log(segmentState, action.index)
      const newArr = []
      for (let i = 0; i < segmentState.length; i++) {
        if (i === action.index) {
          console.log('NEW: ', segmentState[i])

          newArr.push(action.segment)
        } else if (i !== action.index - 1) {
          console.log('OLD: ', segmentState[i])

          newArr.push(segmentState[i])
        }
      }
      return newArr
    case DELETE_FIRST_OR_LAST:
      if (segmentState.length > 0) {
        if (action.index === 0) {
          return segmentState.slice(1)
        } else if (action.index === segmentState.length) {
          return segmentState.slice(0, segmentState.length - 2)
        }
      }

    case CLEAR_PLACES:
      return []

    default:
      return segmentState
  }
}

export default segmentReducer
