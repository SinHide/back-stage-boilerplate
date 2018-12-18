import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter, Link } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import Sider from 'components/Sider'
import loginChecker from 'hocs/loginChecker'
import map from 'lodash/map'
import get from 'lodash/get'
import head from 'lodash/head'
import menuData from 'app/config/menu'
import { combineRoutes } from 'app/config/routes'
import logo from 'assets/logo.svg'
import './BasicLayout.scss'

class BasicLayout extends Component {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    isLogin: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'basicLayout',
    className: '',
  }

  constructor (props) {
    super(props)

    this.menuData = this.formatIntlMenuData(menuData)
  }

  formatIntlMenuData = menu => (
    map(menu, item => {
      const result = {
        ...item,
        name: this.props.intl.formatMessage({ id: item.name })
      }

      if (item.children) {
        result.children = this.formatIntlMenuData(item.children)
      }

      return result
    })
  )

  render () {
    const {
      prefixCls,
      className,
      intl,
      isLogin,
      location,
      children,
    } = this.props

    const classes = classnames({
      [prefixCls]: true,
      [className]: true,
    })

    return (
      <div className={classes}>
        <Sider
          appName={intl.formatMessage({ id: 'appName' })}
          appLogo={logo}
          menuData={this.menuData}
          pathname={location.pathname}
        />
        <div className={`${prefixCls}-mainContent`}>
          {children}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    const pathname = get(state, 'router.location.pathname', '')
    const { route } = head(matchRoutes(combineRoutes, pathname)) // [{match: {}, route: {}}]
    
    return {
      isLogin: state.app.isLogin,
      user: state.app.user,
      route,
      notices: state.app.notices,
      notification: state.app.notification,
    }
  },
)(injectIntl(loginChecker(BasicLayout))))