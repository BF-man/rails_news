import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { Layout } from './views'
import { Home } from './views/Home'
import { Admin } from './views/Admin'

export default (store) => {
  return (
    <Route component={Layout}>
      <IndexRedirect to='/' />
      <Route path='/' component={Home} />
      <Route path='admin' component={Admin} />
    </Route>
  )
}
