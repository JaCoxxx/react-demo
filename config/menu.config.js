export default [
  {
    key: 'index',
    title: '主页',
    icon: 'home',
    path: '/',
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
      },
      {
        key: 'uffectHooks',
        title: 'uffectHooks',
        icon: 'hdd',
        path: '/hooks/uffect-hooks',
      },
      {
        key: 'contextHooks',
        title: 'contextHooks',
        icon: 'hdd',
        path: '/hooks/context-hooks',
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
      },
    ],
  },
];