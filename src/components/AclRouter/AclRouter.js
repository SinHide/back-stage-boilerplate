import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import { checkPermissions, omitRouteRenderProperties } from './utils'
import DefaultLayout from './defaults/defaultLayout'
import DefaultNotFound from './defaults/defaultNotFound'

class AclRouter extends Component {

  static propTypes = {
    authorities: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.func,
    ]),
    normalRoutes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        redirect: PropTypes.string,
        component: PropTypes.func,
      })
    ),
    normalLayout: PropTypes.func,
    authorizedRoutes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string),
        component: PropTypes.func,
        redirect: PropTypes.string,
        unauthrized: PropTypes.func,
      })
    ),
    authorizedLayout: PropTypes.func,
    notFound: PropTypes.func,
  }

  static defaultProps = {
    authorities: '',
    normalRoutes: [],
    normalLayout: DefaultLayout,
    authorizedRoutes: [],
    authorizedLayout: DefaultLayout,
    notFound: DefaultNotFound,
  }

  renderRedirectRoute = route => (
    <Route
      key={route.path}
      {...omitRouteRenderProperties(route)}
      render={() => <Redirect to={route.redirect} />}
    />
  )

  // props pass to Layout & Component are history, location, match
  renderAuthorizedRoute = route => {
    const {
      authorizedLayout: AuthorizedLayout,
      authorities,
    } = this.props
    const {
      path,
      permissions,
      component: RouteComponent,
      unauthrized: Unauthorized,
    } = route
    const hasPermission = checkPermissions(authorities, permissions)

    if (!hasPermission) {
      if (route.unauthrized) {
        return (
          <Route 
            key={path}
            {...omitRouteRenderProperties(route)}
            render={props => (
              <AuthorizedLayout {...props}>
                <Unauthorized {...props} />
              </AuthorizedLayout>
            )}
          />
        )
      }

      if (route.redirect) {
        return this.renderRedirectRoute(route)
      }
    }

    return (
      <Route 
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <AuthorizedLayout {...props}>
            <RouteComponent {...props} />
          </AuthorizedLayout>
        )}
      />
    )
  }

  renderUnauthorizedRoute = route => {
    const {
      normalLayout: NormalLayout,
    } = this.props
    const {
      path,
      redirect,
      component: RouteComponent,
    } = route

    // check if current route is a redirect route (doesn't have component but redirect path)
    if (isNil(RouteComponent) && !isNil(redirect)) {
      return this.renderRedirectRoute(route)
    }

    return (
      <Route 
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <NormalLayout {...props}>
            <RouteComponent {...props} />
          </NormalLayout>
        )}
      />
    )
  }

  renderNotFoundRoute = () => {
    const {
      notFound: NotFound
    } = this.props

    return (
      <Route 
        render={props => (
          <NotFound {...props} />
        )}
      />
    )
  }

  render () {
    const {
      normalRoutes,
      authorizedRoutes,
    } = this.props

    return (
      <Switch>
        {
          map(normalRoutes, route => (
            this.renderUnauthorizedRoute(route)
          ))
        }
        {
          map(authorizedRoutes, route => (
            this.renderAuthorizedRoute(route)
          ))
        }
        {this.renderNotFoundRoute()}
      </Switch>
    )
  }
}

export default AclRouter