import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import Router from 'router/Router'
import BasicLayout from 'layouts/BasicLayout'
import NormalLayout from 'layouts/NormalLayout'
import NotFound from 'views/notFound'
import { authorizedRoutes, normalRoutes } from '../config/routes'
import ConnectedIntlProvider from 'utils/connectedIntlProvider'

const propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
}

const RootRouter = ({ history, user, locale, messages }) => (
  <ConnectedIntlProvider>
    <ConnectedRouter 
      history={history} 
      locale={locale}
      messages={messages}
    >
      <Router
        authorities={user.authorities}
        authorizedRoutes={authorizedRoutes}
        authorizedLayout={BasicLayout}
        normalRoutes={normalRoutes}
        normalLayout={NormalLayout}
        notFound={NotFound}
      />
    </ConnectedRouter>
  </ConnectedIntlProvider>
)

RootRouter.propTypes = propTypes

export default connect(
  state => ({
    user: state.app.user,
    locale: state.locales.lang,
    messages: state.locales.messages,
  })
)(RootRouter)