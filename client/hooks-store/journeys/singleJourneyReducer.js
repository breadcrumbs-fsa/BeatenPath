export const SET_SINGLE_JOURNEY = "SET_SINGLE_JOURNEY"

export const setSingleJourney = journey => ({
    type: SET_SINGLE_JOURNEY,
    journey
})

const journeyReducer = (journeyView, action) => {
    switch(action.type) {
        case SET_SINGLE_JOURNEY:
            return action.journey
        default:
            return journeyView
    }
}

export default journeyReducer