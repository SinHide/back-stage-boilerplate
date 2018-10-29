import DemoComponent from 'view/notFound'

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
    component: DemoComponent
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