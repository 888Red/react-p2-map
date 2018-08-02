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
    const mapLoc = { lat: 41.9035801, lng: 12.4500056 };
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: mapLoc
    });

    let marker = new window.google.maps.Marker({
      position: mapLoc,
      map: map,
      mapTypeId: 'hybrid',
      title: 'St. Peter`s Basilica - the world`s largest'
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Map of Rome and the Vatican</h1>
        </header>
        <main>
          <aside>
            <h2>List</h2>
          </aside>
          <section>
            <div id="map"></div>
            </section>
          </main>
        <footer>
          <p>FEND Project for Udacity | Created by Mildred Pastryk | 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
