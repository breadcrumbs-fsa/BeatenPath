import React, {useContext} from 'react'
import Map from './Map'
import '../../secrets'
import {StoreContext} from '../app'
const mapkey = process.env.GOOGLE_MAPJS_API
import {directions} from '../utils/directions'
import {DELETE_SEGMENT} from '../hooks-store/segmentsReducer'
// context wrapper

export const CommandBar = () => {
  const [state, dispatch] = useContext(StoreContext)
  return <CommandBarView segments={state.segments} dispatch={dispatch} />
}

const CommandBarView = props => {
  return (
    <div>
      <button>x</button>
      <button>add</button>
    </div>
  )
}

export default CommandBar
