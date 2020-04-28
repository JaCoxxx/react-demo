const Pages = require('../src/pages').default
console.log(Pages)
export default [
  {
    key: 'index',
    title: '主页',
    icon: 'home',
    path: '/',
    component: Pages,
    components: () => import(/* webpackChunkName: "home" */ "../src/pages/index"),
  },
  {
    key: 'hooks',
    title: 'Hooks',
    icon: 'container',
    child: [
      {
        key: 'stateHooks',
        title: 'stateHooks',
        icon: 'hdd',
        path: '/hooks/state-hooks',
        component: require('../src/pages/Hooks/stateHooks/index').default,
      },
      {
        key: 'uffectHooks',
        title: 'uffectHooks',
        icon: 'hdd',
        path: '/hooks/uffect-hooks',
        component: require('../src/pages/Hooks/uffectHooks/index').default,
      },
      {
        key: 'contextHooks',
        title: 'contextHooks',
        icon: 'hdd',
        path: '/hooks/context-hooks',
        component: require('../src/pages/Hooks/contextHooks/index').default,
      },
    ],
  },
  {
    key: 'trees',
    title: '树结构',
    icon: 'bars',
    child: [
      {
        key: 'treeDemo',
        title: 'treeDemo',
        icon: 'bars',
        path: '/trees/trees-demo',
        component: require('../src/pages/Trees/index').default,
      },
    ],
  },
];