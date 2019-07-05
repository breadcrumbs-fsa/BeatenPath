export const ADD_PLACE_PREVIEW = 'ADD_PLACE_PREVIEW'
export const PLACE_PREVIEW_TO_FIRST = 'PLACE_PREVIEW_TO_FIRST'
export const PLACE_PREVIEW_TO_NTH = 'PLACE_PREVIEW_TO_NTH'

export const DELETE_PREVIEW = 'DELETE_PREVIEW'

export const addPlacePreview = place => ({
  type: ADD_PLACE_PREVIEW,
  place
})

const placePreviewReducer = (placePreviewState, action) => {
  switch (action.type) {
    case ADD_PLACE_PREVIEW:
      return action.place
    case PLACE_PREVIEW_TO_FIRST:
      return []

    case PLACE_PREVIEW_TO_NTH:
      return []
    case DELETE_PREVIEW:
      return []
    default:
      return placePreviewState
  }
}

export default placePreviewReducer
