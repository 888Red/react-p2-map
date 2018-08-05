import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Header from './Header.js'


function loadMapJS(src) {
   let ref = window.document.getElementsByTagName('script')[0];
   let script = window.document.createElement('script');

   script.src = src;
   script.async = true;
   ref.parentNode.insertBefore(script, ref);

   script.onerror = function () {
   document.write('Google Map is not loading')
 };
}

class Map extends Component {
  constructor(props) {
    super(props);
  }

   componentDidMount() {
    window.initMap = this.initMap;
    loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAQjfF9VNsHrOWzGs8IE9wtU96XbMJwcEU&callback=initMap');
  }

   initMap() {
    const mapLoc = { lat: 41.9005213979, lng: 12.4765647604 };
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: mapLoc
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="map"></div>
      </div>
    );
  }

}

export default Map
