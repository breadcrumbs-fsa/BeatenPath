import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar} from './components'
import Routes from './routes'
import Map from './components/Map.js'
import SimpleContainer from './components/SimpleContainer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />

      <Map />
      <SimpleContainer />
    </div>
  )
}

export default App
