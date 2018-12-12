import Login from 'views/login'
import Agents from 'views/agents'
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
    path: '/agents',
    exact: true,
    permissions: ['admin', 'user'],
    component: Agents,
    unauthorized: DemoComponent,
    pageTitle: 'pageTitle_agents',
    breadcrumb: ['/agents'],
  },
]

const normalRoutes = [
  {
    path: '/',
    exact: true,
    redirect: '/agents',
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