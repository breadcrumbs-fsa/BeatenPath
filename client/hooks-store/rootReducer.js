import combineReducers from '../utils/combineReducers'
import segmentReducer from './segments/segmentsReducer'
import placePreviewReducer from './places/placePreviewReducer'
import placesPreviewReducer from './places/placesReducer'
import segmentPreviewReducer from './segments/segmentPreviewReducer'
import searchReducer from './search/searchReducer'
import singleJourneyReducer from './journeys/singleJourneyReducer'
import journeysReducer from './journeys/journeysReducer'
import placesServiceReducer from './search/placesService'
import {modeReducer} from './mode/modeReducer'

export const initialState = {
  journeys: [],
  segmentPreview: [],
  segments: [],
  placePreview: [],
  places: [],
  searchInput: {},
  journey: {},
  placesService: {},
  mode: {}
}

export const rootReducer = combineReducers({
  journeys: journeysReducer,
  segmentPreview: segmentPreviewReducer,
  segments: segmentReducer,
  placePreview: placePreviewReducer,
  places: placesPreviewReducer,
  searchInput: searchReducer,
  journey: singleJourneyReducer,
  placesService: placesServiceReducer,
  mode: modeReducer
})
