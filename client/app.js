import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import SimpleContainer from './components/SimpleContainer'
import MapContainer from './components/MapContainer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <MapContainer />
      {/* <MapDirections /> */}
      <SimpleContainer />
    </div>
  )
}

export default App
