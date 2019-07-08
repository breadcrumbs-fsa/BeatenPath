export const ADD_PLACES_SERVICE = 'ADD_PLACES_SERVICE'

export const addPlacesService = placesService => ({
  type: ADD_PLACES_SERVICE,
  placesService
})

export const placesServiceReducer = (placesService, action) => {
  switch (action.type) {
    case ADD_PLACES_SERVICE:
      return action.placesService

    default:
      return placesService
  }
}

export default placesServiceReducer
