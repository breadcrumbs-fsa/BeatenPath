import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter, Route, Switch} from 'react-router-dom'
import {AppBar} from './components'
import Routes from './routes'
import MapContainer from './components/MapContainer'
import RouteList from './components/RouteList'

import {rootReducer, initialState} from './hooks-store/rootReducer'
import {createContext} from 'react'
export const StoreContext = createContext()

import {useReducer} from 'react'
import logger from 'use-reducer-logger'
import HomePage from './components/HomePage'
import {PlacePreview} from './components/PlacePreview'
import JourneyList from './components/JourneysList'

const App = () => {
  // const store = useReducer(logger(rootReducer), initialState)
  const store = useReducer(rootReducer, initialState)
  return (
    <StoreContext.Provider value={store}>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '4.5vh',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <AppBar />
          </div>
          <MapContainer />
        </div>
      </div>
    </StoreContext.Provider>
  )
}

export default App

// <BottomInfo />
// <RouteList />
