
import { Router, hashHistory as history } from 'react-router'
import { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import routes from './route'

window.init = () => {
  const router = (
    <Router key={Math.random()} routes={routes} history={history} />
  )

  render(router, document.querySelector('body > main'))
}
