import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import AclRouter from 'components/AclRouter'
import BasicLayout from 'layouts/BasicLayout'
import NormalLayout from 'layouts/NormalLayout'
import NotFound from 'views/notFound'
import { authorizedRoutes, normalRoutes } from '../config/routes'
import ConnectedIntlProvider from 'utils/connectedIntlProvider'

const propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const Router = ({ history, user }) => (
  <ConnectedRouter history={history}>
    <ConnectedIntlProvider>
      <AclRouter
        authorities={user.authorities}
        authorizedRoutes={authorizedRoutes}
        authorizedLayout={BasicLayout}
        normalRoutes={normalRoutes}
        normalLayout={NormalLayout}
        notFound={NotFound}
      />
    </ConnectedIntlProvider>
  </ConnectedRouter>
)

const mapStateToProps = (state) => ({
  user: state.app.user,
})

Router.propTypes = propTypes

export default connect(mapStateToProps)(Router)