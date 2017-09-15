import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { camelizeKeys } from 'humps'
import { Article } from './Article'
import './index.css'

export class Home extends Component {
  state = { article: {} }

  handleReceived = (article) => {
    const camelizedArticle = camelizeKeys(article)
    const { expiresAt, publishedAt, ...articleParams } = camelizedArticle
    articleParams.expiresAt = new Date(expiresAt)
    articleParams.publishedAt = new Date(publishedAt)
    this.setState({ article: articleParams })
  }

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
