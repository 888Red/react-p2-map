import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import Map from './components/Map.js'

class App extends Component {
  render() {
    return (
      <div role="main">
        <section>
          <div className="map" role="application">
            <Map />
          </div>
        </section>

      <footer>
        <img src={logo} className="App-logo" alt="logo" />
        <p>FEND Project for Udacity | Created by Mildred Pastryk | 2018</p>
      </footer>
      </div>
    );
  }
}

export default App;
