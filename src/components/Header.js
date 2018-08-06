import React, { Component } from 'react'
import image from '../img/ft.png'

class Header extends Component {
  render() {
    return (
      <header>
        <a
          onClick={() => {
            this.props.updateViewList()
          }}>
          <img className="fountain" src={image} alt="fountain" />
        </a>
        <h1>Fountains of Rome and the Vatican</h1>
      </header>
    )
  }
}

export default Header
