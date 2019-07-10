export const ADD_CENTER = 'ADD_CENTER'

export const CLEAR_CENTER = 'CLEAR_CENTER'

export const addCenter = center => ({
  type: ADD_CENTER,
  center
})

export const centerReducer = (center, action) => {
  switch (action.type) {
    case ADD_CENTER:
      // console.log('CENTER:', center, 'ACTION:', action.center)
      return action.center
    case CLEAR_CENTER:
      return action.center

    default:
      return center
  }
}

export default centerReducer
