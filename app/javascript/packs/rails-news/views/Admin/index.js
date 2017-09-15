import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { ArticleForm } from './ArticleForm'
import './index.css'

export class Admin extends Component {
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

  handleSubmit = (payload) => {
    this.cableRef.perform('create_admin_article', decamelizeKeys(payload))
  }

  render () {
    const { article } = this.state
    return (
      <div className='rn-Admin'>
        <ActionCable
          ref={this.handleActionCableRef}
          channel={{ channel: 'ArticleChannel' }}
          onReceived={this.handleReceived}
          onConnected={this.handleConnected}
        />
        <ArticleForm onSubmit={this.handleSubmit} initialValues={{ ...article }} />
      </div>
    )
  }
}
