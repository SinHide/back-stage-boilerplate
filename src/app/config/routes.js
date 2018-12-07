import Login from 'views/login'
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
]

const normalRoutes = [
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