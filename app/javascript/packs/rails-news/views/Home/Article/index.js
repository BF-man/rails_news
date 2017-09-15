import React, { PureComponent } from 'react'
import moment from 'moment'
import './index.css'

export class Article extends PureComponent {
  render () {
    const { description, title, publishedAt } = this.props
    return (
      <div className='rn-Article'>
        <ArticleRow title='Title:' value={title} />
        <ArticleRow
          title='Published at:'
          value={publishedAt ? moment(publishedAt).format('DD.MM.YYYY HH:mm Z') : null}
        />
        <ArticleRow title='Description:' value={description} />
      </div>
    )
  }
}

const ArticleRow = ({ title, value }) => {
  return (
    <div className='rn-ArticleRow'>
      <div className='rn-ArticleRow-title'>{title}</div>
      <div className='rn-ArticleRow-value'>{value}</div>
    </div>
  )
}
