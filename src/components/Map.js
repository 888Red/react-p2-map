import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header.js'
import Fountains from './Fountains.js'
import foursquare from '../img/foursquare.png'

/* Functions */
function InfoWindowDetails(props) {
  return (
    <React.Fragment>
      <h4>{props.object.venue.name}</h4>
      <img className="fs-icon" src={`${props.object.venue.categories[0].icon.prefix}64${props.object.venue.categories[0].icon.suffix}`} alt="venue category icon" />
      <h5>Address:</h5><h6>{props.object.venue.location.formattedAddress[0]}</h6>
      <h6>{props.object.venue.location.formattedAddress[1]}</h6>
      <img className="foursquare" src={foursquare} alt="powered by foursquare" />
    </React.Fragment>
  )
}

function createURL(fsURL, params) {
  const paramString = new URLSearchParams(params);
  return fsURL.concat(paramString);
}

/* If fetchError state is true*/
function FetchError(props) {
  return (
    <div className="fs-error" role="alert">
      <h3>Error getting Foursquare venues!</h3>
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
      fetchError: false,
      viewList: false,
      filter: ''
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
          console.log('Status Code: ' + result.meta.code + ' Detail: ' + result.meta.errorDetail)
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

    updateViewList() {
      this.setState({viewList: !this.state.viewList});
    }

    updateFilter(filter) {
      this.setState({filter: filter}, () => this.filterList(this.state.locations))
    }

    parseName(object) {
      const name = object.venue.name;
      return name;
    }

    parseAddress(object) {
      const address = object.venue.location.formattedAddress[0] + ', ' + object.venue.location.formattedAddress[1];
      return address;
    }

    filterList(stateLocations) {
      let showList = this.state.locations;
      if (this.state.filter !== '') {
          showList = stateLocations.filter(object =>
            this.parseName(object).toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1 ||
            this.parseAddress(object).toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
          )
          this.updateMarkers(showList)
      } else {
          this.updateMarkers(showList)
      }
    }

    updateMarkers(showList) {
      const markerUpdate = this.state.locations.map(location => {
      let show = false;
        showList.forEach(displayLocation => {
          if (location.venue.id === displayLocation.venue.id) {
          show = true;
        }
      })
      if (show) {
        location.venue.marker.setMap(this.state.map);
        return location;
      } else {
        location.venue.marker.setMap(null);
        return location;
      }
    })
    this.setState({locations: markerUpdate});
  }

  bounceMarker(object) {
    const animate = this.state.locations.map(location => {
      if (location.venue.id === object.venue.id) {
        if (location.venue.marker.animation) {
          location.venue.marker.setAnimation(null);
          return location;
        }  else {
          location.venue.marker.setAnimation(window.google.maps.Animation.BOUNCE);
          return location;
        }
      } else {
        location.venue.marker.setAnimation(null);
        return location;
      }
    })
    this.setState({locations: animate});
}

  render() {
  return (
    <div>
      <Header
        updateViewList={this.updateViewList.bind(this)}
      />
      {this.state.viewList &&
          <Fountains
            {...this.state}
            openInfoWindow={this.openInfoWindow.bind(this)}
            parseName={this.parseName.bind(this)}
            updateFilter={this.updateFilter.bind(this)}
            updateMarkers={this.updateMarkers.bind(this)}
            bounceMarker={this.bounceMarker.bind(this)}
          />}
      <div
        id="map"
        ref={this.mapElement}
        className={this.state.viewList ? 'map-list' : 'map-only'}>
      </div>
      {this.state.fetchError && <FetchError />}
    </div>
  )
  }
}

export default Map
