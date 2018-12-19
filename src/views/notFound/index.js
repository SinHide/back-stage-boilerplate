import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { Button } from 'antd'
import './index.scss'

class NotFound extends Component {

  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

  render() {
    const { intl } = this.props

    return (
      <div className="view-notFound">
        <div className="view-notFound-errorCode">
          404
        </div>
        <div className="view-notFound-errorDesc">
          {intl.formatMessage({ id: 'notFound_404' })}
        </div>
        <Link to="/" href="/">
          <Button type="primary">
            {intl.formatMessage({ id: 'exception_backToHome' })}
          </Button>
        </Link>
      </div>
    )
  }
}

export default injectIntl(NotFound)
