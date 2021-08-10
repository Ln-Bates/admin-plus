const RouterContainer = () => import('public/view/router');
const Example1 = () => import(/* webpackChunkName: "example-1" */ 'views/example/example-1');
const Example2 = () => import(/* webpackChunkName: "example-2" */ 'views/example/example-2');

export default [
  {
    path: '/example',
    name: 'example',
    component: RouterContainer,
    meta: {
      title: '示例'
    },
    children: [
      {
        path: '',
        name: 'example-1',
        component: Example2,
        meta: {
          title: '部分功能'
        }
      },
      {
        path: 'view-simple',
        name: 'view-simple',
        component: Example1,
        meta: {
          title: '视图组件 - 空'
        }
      }
    ]
  }
];
