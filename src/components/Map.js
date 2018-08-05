import React, { Component } from 'react'
import Header from './Header.js'

/* Functions */

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
     const map = new window.google.maps.Map(this.mapElement, {
      center: this.state.mapLoc,
      zoom: this.state.zoom
    })

    this.setState({map}, this.getFsVenues)
  }

  /* Use Foursquare API to get venues - fountains around Rome */
  getFsVenues() {
    const fsURL = 'https://api.foursquare.com/v2/venues/explore?'
    const params = {
      query: 'fountain',
      limit: '25',
      near: 'Rome, Italy',
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
        return object;
      })
      this.setState({locations: locationsAll})
    }


  render() {
    return (
      <div>
        <Header/>
        <div id="map" ref={this.mapElement}></div>
        {this.state.fetchError && <FetchError />}
      </div>
    );
  }

}

export default Map
