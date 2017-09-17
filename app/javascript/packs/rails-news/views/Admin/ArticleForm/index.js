import React, { PureComponent } from 'react'
import Datetime from '../../../components/Datetime'
import moment from 'moment'
import cs from 'classnames'
import './index.css'

export class ArticleForm extends PureComponent {
  state = { values: { title: '', description: '', expiresAt: '' }, errors: {}, submitted: false }

  componentWillReceiveProps ({ initialValues: { title, description, expiresAt } }) {
    if (title && description && expiresAt) this.setState({ values: { title, description, expiresAt } })
  }

  componentWillUnmount () {
    clearTimeout(this.submittedTimeoutId)
  }

  handleTitleChange = (e) => {
    this.setState({ values: { ...this.state.values, title: e.target.value } })
  }

  handleDescriptionChange = (e) => {
    this.setState({ values: { ...this.state.values, description: e.target.value } })
  }

  handleExpiresAtChange = (momentDate) => {
    if (!moment.isMoment(momentDate)) return this.setState({ expiresAt: '' })
    this.setState({ values: { ...this.state.values, expiresAt: momentDate.toDate() } })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { values: payload } = this.state
    const errors = validate(payload)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      onSubmit(payload)
      this.setState({ submitted: true })
      this.submittedTimeoutId = setTimeout(() => this.setState({ submitted: false }), 5000)
    }
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

  handleValidDate (currentDate) {
    return currentDate >= moment().startOf('day')
  }

  render () {
    const { values: { description, title, expiresAt }, submitted } = this.state
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
            isValidDate={this.handleValidDate}
          />
          <button className='rn-ArticleForm-button' type='submit'>submit</button>
          {submitted ? <div className='rn-ArticleForm-submitted'>Submitted successfully</div> : null}
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
  if (expiresAt && expiresAt < new Date()) errors.expiresAt = 'Date is in the past'
  return errors
}
