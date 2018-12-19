import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import memoize from 'memoize-one'
import map from 'lodash/map'
import { Menu, Icon } from 'antd'
import { formatMenuPath, getFlatMenuKeys, getMenuMatchKeys, pathUrlToList } from './utils'
import './Sider.scss'

const { SubMenu } = Menu

class Sider extends Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
    appBaseUrl: PropTypes.string,
    width: PropTypes.number,
    menuData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
        icon: PropTypes.string,
        children: PropTypes.array,
      })
    ),
    pathname: PropTypes.string.isRequired,
  }

  static defaultProps = {
    prefixCls: 'basicLayout-sider',
    className: '',
    style: {},
    appName: '',
    appLogo: '',
    appBaseUrl: '/',
    width: 256,
    menuData: [],
    pathname: '/',
  }

  constructor (props) {
    super(props)

    this.wholePathMenuData = memoize(menuData => formatMenuPath(menuData))
    this.selectedKeys = memoize((pathname, wholePathMenu) => (
      getMenuMatchKeys(getFlatMenuKeys(wholePathMenu), pathUrlToList(pathname))
    ))

    const { menuData, pathname } = props

    this.state = {
      openKeys: this.selectedKeys(pathname, this.wholePathMenuData(menuData))
    }
  }

  openKeysChange = openKeys => {
    this.setState({ openKeys })
  }

  renderMenu = data => (
    map(data, item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.path}>
          <Link to={item.path} href={item.path}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  )

  renderSiderHeader = () => {
    const {
      appBaseUrl,
      prefixCls,
      appLogo,
      appName,
    } = this.props

    return (
      <Link to={appBaseUrl} href={appBaseUrl}>
        <div className={`${prefixCls}-header`}>
          <img 
            className={`${prefixCls}-logo`}
            src={appLogo} 
            alt='logo'
          />
          <div className={`${prefixCls}-appName`}>
            {appName}
          </div>
        </div>
      </Link>
    )
  }

  renderSiderBody = () => {
    const { 
      prefixCls, 
      pathname, 
      menuData,
    } = this.props
    const { openKeys } = this.state

    return (
      <div className={`${prefixCls}-body`}>
        <Menu
          style={{ padding: '16px 0', width: '100%' }}
          mode='inline'
          theme='dark'
          openKeys={openKeys}
          selectedKeys={this.selectedKeys(pathname, this.wholePathMenuData(menuData))}
          onOpenChange={this.openKeysChange}
        >
          {this.renderMenu(this.wholePathMenuData(menuData))}
        </Menu>
      </div>
    )
  }

  render () {
    const { 
      prefixCls,
      className,
      style,
      width,
    } = this.props

    const classes = `${prefixCls} ${className}`
    const styles = { 
      ...style,
      width,
    }

    return (
      <div className={classes} style={styles}>
        {this.renderSiderHeader()}
        {this.renderSiderBody()}
      </div>
    )
  }
}

export default Sider