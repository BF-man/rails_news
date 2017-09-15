import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { camelizeKeys } from 'humps'
import { Article } from './Article'
import './index.css'

export class Home extends Component {
  state = { article: {} }

  handleReceived = (article) => { this.setState({ article: camelizeKeys(article) }) }

  handleConnected = () => { this.cableRef.perform('get_article') }

  handleActionCableRef = (cableRef) => { this.cableRef = cableRef }

  render () {
    const { article } = this.state
    return (
      <div className='rn-Home'>
        <ActionCable
          ref={this.handleActionCableRef}
          channel={{ channel: 'ArticleChannel' }}
          onReceived={this.handleReceived}
          onConnected={this.handleConnected}
        />
        <Article {...article} />
      </div>
    )
  }
}
