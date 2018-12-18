import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import isEmpty from 'lodash/isEmpty'
import { Input, Icon, Button } from 'antd'
import appAction from 'app/action'
import localeAction from 'i18n/action'
import logo from 'assets/logo.svg'
import './index.scss'

class Login extends Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    isLogin: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    loginUser: PropTypes.func.isRequired,
    localeUpdateLang: PropTypes.func.isRequired,
  }

  static defaultProps = {
    prefixCls: 'view-login',
  }

  state = {
    username: '',
    password: '',
  }

  componentDidMount () {
    const { isLogin, history } = this.props
    if (isLogin) {
      history.push('/')
    }
  }

  componentDidUpdate () {
    const { isLogin, history } = this.props
    if (isLogin) {
      history.push('/')
    }
  }

  renderErrorMsg = () => {
    const { errorMsg, prefixCls } = this.props
    const show = !isEmpty(errorMsg)

    if (show) {
      return (
        <div className={`${prefixCls}-errorMsg`}>
          {errorMsg}
        </div>
      )
    }
    return null
  }

  handleLogin = () => {
    const { loginUser } = this.props
    const { username, password } = this.state

    loginUser(username, password)
  }

  onInputChange = (e, key) => {
    this.setState({ [key]: e.target.value })
  }

  renderLoginPanel = () => {
    const { prefixCls, intl } = this.props
    const { username, password } = this.state

    return (
      <div className={`${prefixCls}-loginPanel`}>
        <div className={`${prefixCls}-appInfo`}>
          <img className={`${prefixCls}-appLogo`} src={logo} alt="logo" />
          <span className={`${prefixCls}-appName`}>
            {intl.formatMessage({ id: 'appName' })}
          </span>
        </div>
        <div className={`${prefixCls}-appDesc`}>
          {intl.formatMessage({ id: 'login_appDesc' })}
        </div>
        <Input
          className={`${prefixCls}-loginInput`}
          style={{ height: 40, marginBottom: 24 }}
          placeholder={
            intl.formatMessage({ id: 'login_usernameInput_placeholder' })
          }
          type="text"
          prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
          value={username}
          onChange={e => this.onInputChange(e, 'username')}
          onPressEnter={this.handleLogin}
        />
        <Input
          className={`${prefixCls}-loginInput`}
          placeholder={
            intl.formatMessage({ id: 'login_passwordInput_placeholder' })
          }
          type="password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
          value={password}
          onChange={e => this.onInputChange(e, 'password')}
          onPressEnter={this.handleLogin}
        />
        <Button
          className={`${prefixCls}-loginBtn`}
          type="primary"
          onClick={this.handleLogin}
        >
          {intl.formatMessage({ id: 'login_login_btn' })}
        </Button>
        <div>
          {this.renderErrorMsg()}
        </div>
      </div>
    )
  }

  renderIntlSwitch = () => {
    const { prefixCls, intl, localeUpdateLang } = this.props

    return (
      <div className={`${prefixCls}-intlSwitch`}>
        <span
          className={classnames({
            [`${prefixCls}-intlItem`]: true,
            [`${prefixCls}-intlItem-active`]: intl.locale === 'en',
          })}
          onClick={() => localeUpdateLang('en')}
          role="presentation"
        >
          English
        </span>
        <span className={`${prefixCls}-intlSwitchSeparator`}>
          |
        </span>
        <span
          className={classnames({
            [`${prefixCls}-intlItem`]: true,
            [`${prefixCls}-intlItem-active`]: intl.locale === 'zh',
          })}
          onClick={() => localeUpdateLang('zh')}
          role="presentation"
        >
          中文
        </span>
      </div>
    )
  }

  render () {
    const { prefixCls } = this.props
    
    return (
      <div className={prefixCls}>
        {this.renderLoginPanel()}
        {this.renderIntlSwitch()}
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({
    isLogin: state.app.isLogin,
    errorMsg: state.app.loginErrorMsg,
  }),
  {
    loginUser: appAction.loginUser,
    localeUpdateLang: localeAction.localeUpdateLang,
  },
)(injectIntl(Login)))