import React, { Component } from 'react'

class Fountains extends Component {
  render() {
    return (
      <div className="list" role="list">
        <div className="search">
          <input
            type="text"
            aria-label="Search box"
            value={this.props.filter}
            placeholder="Search | Filter"
            onChange={(event) => this.props.updateFilter(event.target.value)}
          >
          </input>
        </div>
        <ol>
          {
            this.props.locations.filter(location => location.venue.marker.map !== null).map(object => {
              return (
                <li
                  key={object.venue.id}
                  className={object.venue.id}
                  tabIndex='0'
                  role="button"
                  onClick={() => {
                    this.props.bounceMarker(object)
                    this.props.openInfoWindow(object, {lat: object.venue.location.lat, lng: object.venue.location.lng}, this.props.map, object.venue.marker)
                  }}
                  >
                  <h6>{this.props.parseName(object)}</h6>
                </li>
              )
            })
          }
        </ol>
      </div>
    )
  }
}

export default Fountains
