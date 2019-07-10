import combineReducers from '../utils/combineReducers'
import segmentReducer from './segments/segmentsReducer'
import placePreviewReducer from './places/placePreviewReducer'
import placesPreviewReducer from './places/placesReducer'
import segmentPreviewReducer from './segments/segmentPreviewReducer'
import searchReducer from './search/searchReducer'
import singleJourneyReducer from './journeys/singleJourneyReducer'
import journeysReducer from './journeys/journeysReducer'
import placesServiceReducer from './search/placesService'
import centerReducer from './search/centerReducer'
import {modeReducer} from './mode/modeReducer'
import {boundsReducer} from './search/boundsReducer'
import {setFitBoundsReducer} from './search/setFitBounds'
import {mapFilterReducer} from './search/mapFilterReducer'

export const initialState = {
  journeys: [],
  segmentPreview: [],
  segments: [],
  placePreview: [],
  places: [],
  searchInput: {},
  journey: {},
  placesService: {},
  center: {lat: 41.851, lng: -87.6513},
  bounds: null,
  fitBounds: 'notFit',
  mode: 'home',
  mapFilter: {
    all: 'on'
  }
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
  center: centerReducer,
  bounds: boundsReducer,
  fitBounds: setFitBoundsReducer,
  mode: modeReducer,
  mapFilter: mapFilterReducer
})
