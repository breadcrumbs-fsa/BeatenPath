import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar} from './components'
import Routes from './routes'
import Map from './components/Map.js'
import SimpleContainer from './components/SimpleContainer'
import MapDirections from './components/MapDirections'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />

      <Map />
      <MapDirections />
      <SimpleContainer />
    </div>
  )
}

export default App
