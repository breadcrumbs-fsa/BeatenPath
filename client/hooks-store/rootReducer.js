import combineReducers from './combineReducers'
import segmentReducer from './segmentsReducer'

export const initialState = {
  segments: []
}

export const rootReducer = combineReducers({
  segments: segmentReducer
})
