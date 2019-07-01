import {ADD_SEGMENT_1} from './segmentsReducer'

export const ADD_PLACE_PREVIEW = 'ADD_PLACE_PREVIEW'
export const CONFIRM_PLACE_PREVIEW = 'CONFIRM_PLACE_PREVIEW'
export const DELETE_PLACE_PREVIEW = 'DELETE_PLACE_PREVIEW'

export const addPlacePreview = place => ({
  type: ADD_PLACE_PREVIEW,
  place
})

const placePreviewReducer = (placePreviewState, action) => {
  console.log('RUNNING')
  switch (action.type) {
    case ADD_PLACE_PREVIEW:
      return action.place
    case CONFIRM_PLACE_PREVIEW:
      return []
    case DELETE_PLACE_PREVIEW:
      return []
    default:
      return placePreviewState
  }
}

export default placePreviewReducer
