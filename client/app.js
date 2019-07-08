import React from 'react'
import ReactDOM from 'react-dom'
import {AppBar} from './components'
import Routes from './routes'
import MapContainer from './components/MapContainer'
import RouteList from './components/RouteList'
import {PlacePreview} from './components/PlacePreview'

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
              backgroundColor: 'black',
              display: 'flex',
              height: '2rem',
              width: '100%'
            }}
          >
            <AppBar style={{alignItems: 'stretch'}} />
          </div>
          {/*  <AppBar />*/}
          {/*</div>*/}
          <MapContainer />
          <PlacePreview />
          <div style={{overflowY: 'auto'}}>
            <RouteList style={{overflowY: 'auto'}} />
          </div>
        </div>
      </div>
    </StoreContext.Provider>
  )
}

export default App

// <BottomInfo />
// <RouteList />
