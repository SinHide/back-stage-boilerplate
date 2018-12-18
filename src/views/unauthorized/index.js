import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './index.scss'

class Unauthorized extends Component {

  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

  render() {
    const { intl } = this.props

    return (
      <div className="view-unauthorized">
        <div className="view-unauthorized-errorCode">
          403
        </div>
        <div className="view-unauthorized-errorDesc">
          {intl.formatMessage({ id: 'unauthorized_403' })}
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

export default injectIntl(Unauthorized)
