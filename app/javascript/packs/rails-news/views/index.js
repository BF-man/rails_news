import React, { Component } from 'react'

export class Layout extends Component {
  render () {
    return (
      <div className='rn-Layout'>
        {this.props.children}
      </div>
    )
  }
}
