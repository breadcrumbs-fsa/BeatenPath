import {ADD_SEGMENT_1} from '../segments/segmentsReducer'

export const PLACE_PREVIEW_TO_FIRST = 'PLACE_PREVIEW_TO_FIRST'

export const PLACE_PREVIEW_TO_NTH = 'PLACE_PREVIEW_TO_NTH'

export const placePreviewToFirst = place => ({
  type: PLACE_PREVIEW_TO_FIRST,
  place
})

const placesReducer = (placesState, action) => {
  switch (action.type) {
    case PLACE_PREVIEW_TO_FIRST:
      return [action.place]
    case PLACE_PREVIEW_TO_NTH:
      return [...placesState, action.place]

    default:
      return placesState
  }
}

export default placesReducer
