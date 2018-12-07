import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import isEmpty from 'lodash/isEmpty'
import { Input, Icon, Button } from 'antd'
import appAction from 'app/action'
import logo from 'assets/logo.svg'
import './index.scss'

const propTypes = {
  prefixCls: PropTypes.string,
  isLogin: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const defaultProps = {
  prefixCls: 'view-login',
}

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount () {

  }

  componentDidUpdate () {

  }

  renderLoginPanel = () => {
    const { prefixCls } = this.props
    const { username, password } = this.state

    return (
      <div className={`${prefixCls}-loginPanel`}>
        <div className={`${prefixCls}-appInfo`}>
          <img className={`${prefixCls}-appLogo`} src={logo} alt="logo" />
          <span className={`${prefixCls}-appName`}>
            1111
          </span>
        </div>
        <div className={`${prefixCls}-appDesc`}>
          44444444444
        </div>
        <Input
          className={`${prefixCls}-loginInput`}
          style={{ height: 40, marginBottom: 24 }}
          placeholder='3333'
          type="text"
          prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
          value={username}
          onChange={e => this.onInputChange(e, 'username')}
          onPressEnter={this.handleLogin}
        />
        <Input
          className={`${prefixCls}-loginInput`}
          placeholder='6666'
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
          2222
        </Button>
        <div>
          {this.renderErrorMsg()}
        </div>
      </div>
    )
  }

  render () {
    const { prefixCls } = this.props
    
    return (
      <div className={prefixCls}>
        {this.renderLoginPanel()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.app.isLogin,
  errorMsg: state.app.loginErrorMsg,
})

const mapDispatchToProps = {
  loginUser: appAction.loginUser,
}

Login.propTypes = propTypes
Login.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Login))