import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Redirect from '../views/Redirect.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Redirect,
    // redirect: '/',
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history', // TODO: Mirar si con 'hash' funciona bien
  base: process.env.BASE_URL,
  routes,
});

export default router;
