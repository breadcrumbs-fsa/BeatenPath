import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar, AppBar} from './components'
import Routes from './routes'
import Map from './components/Map.js'
import SimpleContainer from './components/SimpleContainer'
import MapDirections from './components/MapDirections'
import {GoogleMap} from 'react-google-maps'
import MapContainer from './components/MapContainer'
import RouteList from './components/RouteList'

import {rootReducer, initialState} from './hooks-store/rootReducer'

import {createContext} from 'react'

export const Store = createContext()

import {useReducer} from 'react'
import logger from 'use-reducer-logger'

const App = () => {
  // const store = useReducer(logger(rootReducer), initialState)
  const store = useReducer(rootReducer, initialState)
  return (
    <Store.Provider value={store}>
      <div>
        <AppBar />
        <MapContainer />
        <RouteList />
      </div>
    </Store.Provider>
  )
}

export default App
