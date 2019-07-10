export const ADD_BOUNDS = 'ADD_BOUNDS'

export const CLEAR_BOUNDS = 'CLEAR_BOUNDS'

export const addBounds = bounds => ({
  type: ADD_BOUNDS,
  bounds
})

export const boundsReducer = (bounds, action) => {
  switch (action.type) {
    case ADD_BOUNDS:
      // console.log('BOUNDS:', bounds, 'ACTION:', action.bounds)
      return action.bounds
    case CLEAR_BOUNDS:
      return action.bounds

    default:
      return bounds
  }
}

export default boundsReducer
