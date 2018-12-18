import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const loginChecker = (WrappedComponent) => {
  class LoginChecker extends Component {

    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
    }
  
    componentDidMount() {
      if (!this.props.isLogin) {
        this.props.history.push('/login')
      }
    }
  
    componentDidUpdate() {
      if (!this.props.isLogin) {
        this.props.history.push('/login')
      }
    }
  
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return withRouter(LoginChecker)
}

export default loginChecker