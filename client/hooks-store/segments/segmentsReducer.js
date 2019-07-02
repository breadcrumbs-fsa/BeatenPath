export const ADD_SEGMENT_1 = 'ADD_SEGMENT_1'
export const DELETE_SEGMENT = 'DELETE_SEGMENT'
export const DELETE_FIRST_OR_LAST = 'DELETE_FIRST_OR_LAST'

export const addSegment1 = segment => ({
  type: ADD_SEGMENT_1,
  segment
})

export const placePreviewToNth = segment => ({
  type: ADD_SEGMENT_1,
  segment
})
export const deleteSegment = (segment, index) => ({
  type: DELETE_SEGMENT,
  segment,
  index
})

export const deleteFirstOrLast = index => ({
  type: DELETE_FIRST_OR_LAST,
  index
})

const segmentReducer = (segmentState, action) => {
  switch (action.type) {
    case ADD_SEGMENT_1:
      return [...segmentState, action.segment]

    case DELETE_SEGMENT:
      const newArr = []
      for (let i = 0; i < segmentState.length; i++) {
        if (i == action.index) {
          newArr.push(action.segment)
        } else if (i !== action.index + 1) {
          newArr.push(segmentState[i])
        }
      }
      return newArr
    case DELETE_FIRST_OR_LAST:
      //TODO fix this case, delete places instead of routes and recalculate routes
      if (action.index === 0) {
        console.log('removing first')
        return segmentState.slice(1)
      } else if (action.index === segmentState.length) {
        console.log('removing last')

        return segmentState.slice(-1)
      }
    default:
      return segmentState
  }
}

export default segmentReducer
