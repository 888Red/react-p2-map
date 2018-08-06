import React, { Component } from 'react'

class Fountains extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            type="text"
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
                  onClick={() => {
                    this.props.bounceMarker(object)
                    this.props.openInfoWindow(object, {lat: object.venue.location.lat, lng: object.venue.location.lng}, this.props.map, object.venue.marker)
                  }}
                  >
                  <h5>{this.props.parseName(object)}</h5>
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
