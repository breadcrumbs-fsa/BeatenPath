import combineReducers from '../utils/combineReducers'
import segmentReducer from './segments/segmentsReducer'
import placePreviewReducer from './places/placePreviewReducer'
import placesPreviewReducer from './places/placesReducer'
import segmentPreviewReducer from './segments/segmentPreviewReducer'
import searchReducer from './search/searchReducer'
import journeyReducer from './journeys/singleJourneyReducer'

export const initialState = {
  segmentPreview: [],
  segments: [],
  placePreview: [],
  places: [],
  searchInput: {},
  journeyView: []
}

export const rootReducer = combineReducers({
  segmentPreview: segmentPreviewReducer,
  segments: segmentReducer,
  placePreview: placePreviewReducer,
  places: placesPreviewReducer,
  searchInput: searchReducer,
  journeyView: journeyReducer
})
