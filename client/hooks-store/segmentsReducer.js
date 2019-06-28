const ADD_SEGMENT_1 = 'ADD_SEGMENT_1'
const TEST = 'TEST'

export const addSegment1 = segment => ({
  type: ADD_SEGMENT_1,
  segment
})

export const addTest = segment => ({
  type: TEST,
  segment: segment
})

const segmentReducer = (segmentState, action) => {
  switch (action.type) {
    case ADD_SEGMENT_1:
      console.log('segmentState: ', segmentState)
      return [...segmentState, action.segment]

    case TEST:
      console.log(segmentState)
      return action.segment
    default:
      return segmentState
  }
}

export default segmentReducer
