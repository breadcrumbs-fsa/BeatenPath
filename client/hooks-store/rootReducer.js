import combineReducers from './combineReducers'
import segmentReducer from './segmentsReducer'
import placePreviewReducer from './placePreviewReducer'

export const initialState = {
  segments: [],
  placePreview: []
}

export const rootReducer = combineReducers({
  segments: segmentReducer,
  placePreview: placePreviewReducer
})
