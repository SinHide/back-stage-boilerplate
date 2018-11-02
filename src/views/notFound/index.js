import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './index.scss'

class NotFound extends Component {
  render () {
    return (
      <div className='view-notFound'>
        <p className='view-notFound-errorCode'>404</p>
        <p className='view-notFound-errorDesc'>Not Found</p>
        <Link to='/' href='/'>
          <Button type='primary'>
            回到首页
          </Button>
        </Link>
      </div>
    )
  }
}

export default NotFound