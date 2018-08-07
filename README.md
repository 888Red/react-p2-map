# Map Application (React)
---

## Project Overview

This is the last project for **Udacity** students who are taking the *Front-End Developer Nanodegree*.  It is a single page Google Map application featuring the **Fountains (and related locations) of Rome and the Vatican**.

### Key Learnings

- React Framework
- Map with Markers
- List of Locations with Filter Function
- Asynchronous API Requests and Error Handling
- Accessibility: ARIA and Semantic Elements
- Offline Availability: Service Worker

### App Functionality

The map is centered at the GPS coordinates of Fontana di Trevi in Rome, Italy. There are 25 Markers showing the locations. When a marker is clicked, an InfoWindow from Foursquare shows the name, address and an icon of the location category. Google Map provides the InfoWindow of the other points of interest or locations.

The *Fountain* image on the header is a toggle that shows and hides the list of the 25 locations. These locations can be filtered by names. When the name of the location is clicked, the same InfoWindow from Foursquare appears and the red marker bounces.

### Installation

- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) should be installed in your machine to run this app.
- Clone this repository
- Go to the root of this folder in your terminal
- Run `npm install` to install dependencies
- Run `npm start` to open the browser pointing to http://localhost:3000

### Dependencies

- node.js
- npm
- React | [Create React App](https://github.com/facebookincubator/create-react-app)
- [Google Maps API](https://developers.google.com/maps/documentation/)
- [Foursquare API](https://developer.foursquare.com/places-api)

### Deployment

[GitHub Pages](https://888red.github.io/react-p2-map/)

### Credits

Udacity Community, Student Leaders and study buddies on Slack --- THANK YOU!
