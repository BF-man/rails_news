import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import ActionCableProvider from 'react-actioncable-provider'
import routes from './routes'
import { BACKEND_ACTION_CABLE_URL } from './config.js'
import './index.css'

const $root = document.body.appendChild(document.createElement('div'))

const renderView = (Routes) => render(
  <ActionCableProvider url={BACKEND_ACTION_CABLE_URL}>
    <Router history={browserHistory}>
      {routes()}
    </Router>
  </ActionCableProvider>,
  $root
)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextRoutes = require('./routes')
    renderView(NextRoutes)
  })
}

renderView(routes)
