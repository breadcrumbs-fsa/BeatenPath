import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar} from './components'
import Routes from './routes'
import Map from './components/Map.js'
import SimpleContainer from './components/SimpleContainer'
import MapDirections from './components/MapDirections'
import {GoogleMap} from 'react-google-maps'
import MapContainer from './components/MapContainer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <MapContainer />
      <MapDirections />
      <SimpleContainer />
    </div>
  )
}

export default App
