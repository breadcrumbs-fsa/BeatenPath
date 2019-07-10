export const SET_FIT_BOUNDS = 'SET_FIT_BOUNDS'

export const setFitBounds = fitBounds => ({
  type: SET_FIT_BOUNDS,
  fitBounds
})

export const setFitBoundsReducer = (fitBounds, action) => {
  switch (action.type) {
    case SET_FIT_BOUNDS:
      return action.fitBounds

    default:
      return fitBounds
  }
}

export default setFitBoundsReducer
