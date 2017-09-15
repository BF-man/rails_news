import React, { PureComponent } from 'react'
import Datetime from '../../../components/Datetime'
import moment from 'moment'
import cs from 'classnames'
import './index.css'

export class ArticleForm extends PureComponent {
  state = { title: '', description: '', expiresAt: '', errors: {} }

  componentWillReceiveProps ({ initialValues: { title, description, expiresAt } }) {
    if (title && description && expiresAt) this.setState({ title, description, expiresAt })
  }

  handleTitleChange = (e) => { this.setState({ title: e.target.value }) }

  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }) }

  handleExpiresAtChange = (momentDate) => {
    if (!moment.isMoment(momentDate)) return this.setState({ expiresAt: '' })
    this.setState({ expiresAt: momentDate.toDate() })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { errors: _errors, ...payload } = this.state
    const errors = validate(payload)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) return onSubmit(payload)
  }

  get titleClassName () {
    const { errors: { title } } = this.state
    return cs('rn-ArticleForm-title', { 'has-error': title })
  }

  get descriptionClassName () {
    const { errors: { description } } = this.state
    return cs('rn-ArticleForm-description', { 'has-error': description })
  }

  get expiresAtClassName () {
    const { errors: { expiresAt } } = this.state
    return cs('rn-ArticleForm-expiresAt', { 'has-error': expiresAt })
  }

  render () {
    const { description, title, expiresAt } = this.state
    return (
      <div className='rn-ArticleForm'>
        <form onSubmit={this.handleSubmit}>
          <input
            name='title'
            className={this.titleClassName}
            value={title}
            onChange={this.handleTitleChange}
            placeholder='Title'
          />
          <input
            name='description'
            className={this.descriptionClassName}
            value={description}
            onChange={this.handleDescriptionChange}
            placeholder='Description'
          />
          <Datetime
            onChange={this.handleExpiresAtChange}
            inputProps={{ name: 'expiresAt', placeholder: 'Expires at', className: this.expiresAtClassName }}
            dateFormat={'DD.MM.YYYY'}
            timeFormat='HH:mm Z'
            value={expiresAt}
          />
          <button className='rn-ArticleForm-button' type='submit'>submit</button>
        </form>
      </div>
    )
  }
}

const validate = ({ description, title, expiresAt }) => {
  const errors = {}
  if (!description) errors.description = 'Required field'
  if (!title) errors.title = 'Required field'
  if (!expiresAt) errors.expiresAt = 'Required field'
  return errors
}
