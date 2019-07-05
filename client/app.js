import React from 'react'
import ReactDOM from 'react-dom'
import {AppBar} from './components'
import Routes from './routes'
import MapContainer from './components/MapContainer'
import RouteList from './components/RouteList'

import {rootReducer, initialState} from './hooks-store/rootReducer'
import {createContext} from 'react'
export const StoreContext = createContext()

import {useReducer} from 'react'
import logger from 'use-reducer-logger'

const App = () => {
  // const store = useReducer(logger(rootReducer), initialState)
  const store = useReducer(rootReducer, initialState)
  return (
    <StoreContext.Provider value={store}>
      <div>
        <AppBar />
        <MapContainer />
        <RouteList />
      </div>
    </StoreContext.Provider>
  )
}

export default App

// <BottomInfo />
// <RouteList />
