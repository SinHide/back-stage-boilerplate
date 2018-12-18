import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import indexOf from 'lodash/indexOf'
import omit from 'lodash/omit'

const checkPermissions = (authorities, permissions) => {
  if (isEmpty(permissions)) {
    return true
  }

  if (isArray(authorities)) {
    for (let i = 0; i < authorities.length; i += 1) {
      if (indexOf(permissions, authorities[i]) !== -1) {
        return true
      }
    }
    return false
  }

  if (isString(authorities)) {
    return indexOf(permissions, authorities) !== -1
  }

  if (isFunction(authorities)) {
    return authorities(permissions)
  }

  throw new Error('[Acl-Router]: Unsupport type of authorities')
}

const OMIT_ROUTE_RENDER_PROPERTIES = ['render', 'component']

const omitRouteRenderProperties = route => (
  omit(route, OMIT_ROUTE_RENDER_PROPERTIES)
)

export {
  checkPermissions,
  omitRouteRenderProperties,
}