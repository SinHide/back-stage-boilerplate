import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import AclRouter from 'components/AclRouter'
import BasicLayout from 'layouts/BasicLayout'
import NormalLayout from 'layouts/NormalLayout'
import NotFound from 'views/notFound'
import { authorizedRoutes, normalRoutes } from '../config/routes'

const propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const Router = ({ history, user }) => (
  <ConnectedRouter history={history}>
    <AclRouter
      authorities={user.authorities}
      authorizedRoute={authorizedRoutes}
      authorizedLayout={BasicLayout}
      normalRoutes={normalRoutes}
      normalLayout={NormalLayout}
      notFound={NotFound}
    />
  </ConnectedRouter>
)

const mapStateToProps = (state) => ({
  user: state.app.user,
})

Router.propTypes = propTypes

export default connect(mapStateToProps)(Router)