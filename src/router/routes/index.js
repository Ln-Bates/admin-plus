const Layout = () => import(/* webpackChunkName: "layout-index" */ '@/layout/home');
import example from './example';
export const children = [
  ...example
];
export const defaultRoutes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    children
  }
];
export default [
  ...defaultRoutes
];