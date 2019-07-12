import {DirectionsRenderer, GoogleMap, Marker} from 'react-google-maps'
import {MarkerWithLabel} from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import React, {Component, createContext, useContext} from 'react'
import {StoreContext} from '../app'
import {colorPicker} from '../utils/colorPicker'

export const MarkerView = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <MarkerViewer
      segments={state.segments}
      dispatch={dispatch}
      segmentPreview={state.segmentPreview}
      placePreview={state.placePreview}
      places={state.places}
      journeys={state.journeys}
    />
  )
}

const MarkerViewer = props => {
  return (
    <div>
      {props.placePreview[0] && (
        <Marker
          // label={{
          //   path: google.maps.MarkerLabel,
          //   text: null
          // }}
          icon="/marker-startnum.png"
          // strokeColor: colorPicker(-1),
          // fillColor: colorPicker(-1),
          // fillOpacity: 1,
          // scale: 7

          position={props.placePreview[0].geometry.location}
        />
      )}
      {props.places[0] &&
        props.places.map((place, index) => (
          <Marker
            // label={{
            //   path: google.maps.MarkerLabel,
            //   text: null
            // }}
            // labelAnchor={new google.maps.Point(0, 0)}
            // labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
            icon={`/markernums${props.places.length - index}.png`}
            // path: (
            // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAyVBMVEVHcExmzOBmyN8A//9V1dWA//9nxt9Vqv9mx99mx+Bmxt9mx99myN1mzOZmxt9nx+Bmx99mx99mx99lyN9mzMxttttmxt5mx99mx99mxuBlyN9nyOBox99jxd5nx95lx99lyuFmx99kyd5ox+Fmxt9mx99xxuNoxdxlyOBmx95nyOFnyN9kx+Bqyt9mx99mx99mx99mx99mx99nxt9mx99oxuNmxt9lx+BmyN9mx99mx99mx99nxuBmx99oxdxmxt9nyN5nx99mx98acLD8AAAAQnRSTlMAGcYBBgJIA9zDh/g8Ct1SX/nKWAUHlOrfWqZKIB9NtSuWPTvU/QksU/sqZikY7PHS1+HC8BtQW8Hgp9Vj5xaZRcc1Qz3AAAAA0klEQVQoz22R5wKCMAyEAzIEVFRA3HvvvWff/6FsqpaC3J9e7oPQBICvlMNZlsslBSJqZwhTMhXOKznyVU4T892CcG0lAbRYF9Nk/QpBrs9pvUkDpA1qfJ2DKj7YQZdCV+NggOUMnYSuyUG/R0sb3ZCakRd85Ejr0xRgvKamIdwqix0sw7Dw3AtAKQZzdFVxwkkA7NBK3OQvX6rhZWV/oB7Zrr765PlEdO/OB2jRHNQLewH+dUXgxADPJ+TmxgB4hH6FII2QZyygK7/HgsRLFoZ4A8S8LTdVnO97AAAAAElFTkSuQmCC" />
            // ),
            // strokeColor: colorPicker(index),
            // fillColor: 'black',
            // fillOpacity: 1,
            // scale: 7
            // }}
            key={index}
            position={place.geometry.location}
          />
        ))}
    </div>
  )
}

export default MarkerView
