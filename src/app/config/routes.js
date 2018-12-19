import Login from 'views/login'
import Shops from 'views/shops'
import Unauthorized from 'views/unauthorized'

const authorizedRoutes = [
  {
    path: '/shops',
    exact: true,
    permissions: ['admin', 'user'],
    component: Shops,
    unauthorized: Unauthorized,
    pageTitle: 'pageTitle_shops',
    breadcrumb: ['/shops'],
  },
  {
    path: '/exception/403',
    exact: true,
    permissions: ['nobody'],
    component: Shops,
    unauthorized: Unauthorized,
  }
]

const normalRoutes = [
  {
    path: '/',
    exact: true,
    redirect: '/shops',
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
]

const combineRoutes = [
  ...authorizedRoutes,
  ...normalRoutes,
]

export {
  authorizedRoutes,
  normalRoutes,
  combineRoutes,
}