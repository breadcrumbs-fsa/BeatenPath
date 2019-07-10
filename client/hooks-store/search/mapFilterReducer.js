export const TOGGLE_ALL = 'TOGGLE_ALL'

export const toggleAll = () => ({
  type: TOGGLE_ALL
})

export const mapFilterReducer = (mapFilter, action) => {
  switch (action.type) {
    case TOGGLE_ALL:
      console.log('toggling')
      if (mapFilter.all === 'on') {
        return {...mapFilter, all: 'off'}
      } else if (mapFilter.all === 'off') return {...mapFilter, all: 'on'}

    default:
      return mapFilter
  }
}

export default mapFilterReducer
