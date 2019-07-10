export const mapFlags = {
  all: 'on'
}

export const mapStyle = Flags => [
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#2f445c'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#c9955a'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f0ecd8'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c6ddc3'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ecd9be'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: Flags.all
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#dbceb8'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: '0'
      },
      {
        visibility: 'on'
      },
      {
        color: '#dbceb8'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#81c86e'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#d2cbc3'
      },
      {
        saturation: '0'
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d586d'
      },
      {
        saturation: '0'
      },
      {
        weight: '2.00'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#d2cbc3'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#eaeaea'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#d0e8fb'
      },
      {
        saturation: '0'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  }
]
