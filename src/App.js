import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);
  }
   componentDidMount() {
    window.initMap = this.initMap;
    loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAQjfF9VNsHrOWzGs8IE9wtU96XbMJwcEU&callback=initMap');
  }
   initMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 41.9035801, lng: 12.4500056 }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FEND Project: Vatican Map</h1>
        </header>
        <div id="map">
        </div>
      </div>
    );
  }
}

export default App;
