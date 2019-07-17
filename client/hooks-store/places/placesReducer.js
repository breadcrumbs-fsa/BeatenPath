import {ADD_SEGMENT_1, DELETE_SEGMENT} from '../segments/segmentsReducer'

export const PLACE_PREVIEW_TO_FIRST = 'PLACE_PREVIEW_TO_FIRST'

export const PLACE_PREVIEW_TO_NTH = 'PLACE_PREVIEW_TO_NTH'

export const DELETE_FIRST_OR_LAST = 'DELETE_FIRST_OR_LAST'
export const DELETE_PLACE = 'DELETE_PLACE'
export const CLEAR_PLACES = 'CLEAR_PLACES'
export const ADD_PLACES_ARRAY = 'ADD_PLACES_ARRAY'

export const ActionCreatorName = places => ({
  type: ADD_PLACES_ARRAY,
  places
})

export const placePreviewToFirst = place => ({
  type: PLACE_PREVIEW_TO_FIRST,
  place
})

export const placePreviewToNth = place => ({
  type: PLACE_PREVIEW_TO_NTH,
  place
})

export const deleteFirstOrLast = index => ({
  type: DELETE_FIRST_OR_LAST,
  index
})

export const deletePlace = index => ({
  type: DELETE_PLACE,
  index
})

export const clearPlaces = () => ({
  type: CLEAR_PLACES
})

const placesReducer = (placesState, action) => {
  switch (action.type) {
    case PLACE_PREVIEW_TO_FIRST:
      return [action.place]
    case DELETE_FIRST_OR_LAST:
      if (action.index === 0) {
        return placesState.slice(0, placesState.length - 1)
      } else {
        return placesState.slice(1)
      }
    case DELETE_PLACE: {
      return placesState.filter((item, index) => index !== action.index)
    }

    case PLACE_PREVIEW_TO_NTH:
      return [...placesState, action.place]
    case ADD_PLACES_ARRAY:
      return action.places

    case CLEAR_PLACES:
      return []

    default:
      return placesState
  }
}

export default placesReducer
