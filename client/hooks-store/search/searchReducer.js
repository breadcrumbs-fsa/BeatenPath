export const ADD_REF = 'ADD_REF'

export const PLACE_PREVIEW_TO_FIRST = 'PLACE_PREVIEW_TO_FIRST'

export const PLACE_PREVIEW_TO_NTH = 'PLACE_PREVIEW_TO_NTH'

export const DELETE_PREVIEW = 'DELETE_PREVIEW'

export const placePreviewToFirst = () => ({
  type: PLACE_PREVIEW_TO_FIRST
})

export const addRef = ref => ({
  type: ADD_REF,
  ref
})

const searchReducer = (searchInput, action) => {
  switch (action.type) {
    case PLACE_PREVIEW_TO_FIRST:
      searchInput.value = ''
      return searchInput
    case PLACE_PREVIEW_TO_NTH:
      searchInput.value = ''
      return searchInput
    case DELETE_PREVIEW:
      searchInput.value = ''
      return searchInput
    case ADD_REF:
      return action.ref
    default:
      return searchInput
  }
}

export default searchReducer
