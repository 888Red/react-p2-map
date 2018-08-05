import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import Map from './components/Map.js'

class App extends Component {
  render() {
    return (
      <div>
        <section>
          <div className="map">
            <Map />
          </div>
        </section>

      <footer>
        <img src={logo} className="App-logo" alt="logo" />
        <h6>FEND Project for Udacity | Created by Mildred Pastryk | 2018</h6>
      </footer>
      </div>
    );
  }
}

export default App;
