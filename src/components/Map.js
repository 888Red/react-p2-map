import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header.js'
import foursquare from '../img/foursquare.png'

/* Functions */
function InfoWindowDetails(props) {
  return (
    <React.Fragment>
      <h3>{props.object.venue.name}</h3>
      <h4>Address:</h4><p>{props.object.venue.location.formattedAddress[0]}</p>
      <p>{props.object.venue.location.formattedAddress[1]}</p>
      <img className="foursquare" src={foursquare} alt="powered by foursquare" />
    </React.Fragment>
  )
}

function createURL(fsURL, params) {
  const paramString = new URLSearchParams(params);
  return fsURL.concat(paramString);
}

function FetchError(props) {
  return (
    <div>
      <h3>Error getting Foursquare venues</h3>
    </div>
  )
}

/* Map */

class Map extends Component {
  /* Set the state */
  constructor(props) {
    super(props)
    this.mapElement = React.createRef()
    this.state = {
      map: null,
      zoom: 15,
      locations: [],
      mapLoc: { lat: 41.9005213979, lng: 12.4765647604 },
      fetchError: false
    }
  }

  /* Mount and initialize the map */
   componentDidMount() {
     if (window.google) {
       this.initMap();
      }
    }

   initMap() {
     const map = new window.google.maps.Map(this.mapElement.current, {
      center: this.state.mapLoc,
      zoom: this.state.zoom
    })

    this.setState({map}, this.getFsVenues)
  }

  /* Use Foursquare API to get top venues using explore endpoint - fountains around Rome */
  getFsVenues() {
    const fsURL = 'https://api.foursquare.com/v2/venues/explore?'
    const params = {
      query: 'fountain',
      limit: '25',
      near: 'Rome, Italy',
      radius: 12000,
      client_id: 'O51T00R0EHFYS3CDFIMKMN232SX53A5KKGU02I1LQT5DWB1I',
      client_secret: 'URFU1AYKAJMXKIF5OMZWYZJJ24T1FOO3BCSQ20QBSTDDAEO1',
      v: '20180802'
    }

    fetch(createURL(fsURL, params))
      .then(result => result.json())
      .then(result => {
        if (result.meta.code !== 200) {
          this.setState({fetchError: true})
        }
        return this.setState({locations: result.response.groups[0].items}, this.setLocation)
      })
      .catch(error => console.log(error))
    }

    setLocation() {
      const locationsAll = this.state.locations.map(object => {
        const position = {lat: object.venue.location.lat, lng: object.venue.location.lng};
        this.addInfoWindow(object, position);
        this.addMarkers(object, position, this.state.map);
          return object;
        })
        this.setState({locations: locationsAll})
    }

    /* Add InfoWindow and Markers*/
    addInfoWindow(object, position) {
      const infoWindow = new window.google.maps.InfoWindow();
      infoWindow.setPosition(position);
      infoWindow.addListener('closeclick', () => {
        if (object.venue.marker.animation) {
          object.venue.marker.setAnimation(null);
        }
      })
      object.venue.infoWindow = infoWindow;
    }

    addMarkers(object, position, map) {
      const marker = new window.google.maps.Marker();
      marker.setPosition(position);
      marker.setMap(map);
      marker.addListener('click', () => {
        this.openInfoWindow(object, position, map, marker)
        if (marker.animation) {
          marker.setAnimation(null);
        }
      });
      object.venue.marker = marker;
    }

    /*  Render updates of InfoWindow and Markers */

    openInfoWindow(object, position, map, marker) {
      const updateInfoWindow = this.state.locations.map(location => {
        if (location.venue.id === object.venue.id) {
          if (location.venue.infoWindow.map) {
              location.venue.infoWindow.close();
              return location;
            } else {
              this.addWindowDetails(location);
              location.venue.infoWindow.open(map, marker);
              return location;
            }
          } else {
            location.venue.infoWindow.close();
            return location;
          }
        })
        map.panTo(position);
        this.setState({locations: updateInfoWindow})
    }

    addWindowDetails(object) {
      const div = document.createElement('div');
      div.className = 'info-window';
      ReactDOM.render(<InfoWindowDetails object={object} />, div)
      object.venue.infoWindow.setContent(div);
  }

  render() {
  return (
    <div>
      <Header/>

      <div
        id="map"
        ref={this.mapElement}></div>
      {this.state.fetchError && <FetchError />}
    </div>
  )
}
}

export default Map
