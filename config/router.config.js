export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/', component: '../pages/index' },
      { path: '/hooks/state-hooks', component: '../pages/Hooks/stateHooks/index' },
      { path: '/hooks/uffect-hooks', component: '../pages/Hooks/uffectHooks/index' },
      { path: '/hooks/context-hooks', component: '../pages/Hooks/contextHooks/index' },
      { path: '/trees/trees-demo', component: '../pages/Trees/index' },
    ],
  },
  {
    path: '/404',
    component: '../pages/404',
  },
]