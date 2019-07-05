import combineReducers from '../utils/combineReducers'
import segmentReducer from './segments/segmentsReducer'
import placePreviewReducer from './places/placePreviewReducer'
import placesPreviewReducer from './places/placesReducer'
import segmentPreviewReducer from './segments/segmentPreviewReducer'
import searchReducer from './search/searchReducer'
import singleJourneyReducer from './journeys/singleJourneyReducer'
import journeysReducer from './journeys/journeysReducer'

export const initialState = {
  journeys: [],
  segmentPreview: [],
  segments: [],
  placePreview: [],
  places: [],
  searchInput: {},
  journeyView: []
}

export const rootReducer = combineReducers({
  journeys: journeysReducer,
  segmentPreview: segmentPreviewReducer,
  segments: segmentReducer,
  placePreview: placePreviewReducer,
  places: placesPreviewReducer,
  searchInput: searchReducer,
  journeyView: singleJourneyReducer
})
