import Login from 'views/login'
import Shops from 'views/shops'
import DemoComponent from 'views/notFound'

const authorizedRoutes = [
  {
    path: '/dashboard/demo',
    exact: true,
    permissions: ['admin', 'user'],
    redirect: '/login',
    component: DemoComponent,
    pageTitle: '',
  },
  {
    path: '/shops',
    exact: true,
    permissions: ['admin', 'user'],
    component: Shops,
    unauthorized: DemoComponent,
    pageTitle: 'pageTitle_shops',
    breadcrumb: ['/shops'],
  },
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