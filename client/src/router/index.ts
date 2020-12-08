import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Redirect from '@/views/Redirect.vue';
import NotFound from '@/views/NotFound.vue';
import Top from '@/views/Top.vue';
import Me from '@/views/Me.vue';
import store from '@/store';

Vue.use(VueRouter);

const checkIfAuthenticated = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (store.state.credentials.isLogged) {
    next();
    return;
  }
  next('/');
};

const checkIfNotAuthenticated = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (store.state.credentials.isLogged) {
    next('/');
    return;
  }
  next();
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Redirect,
    beforeEnter: checkIfNotAuthenticated,
  },
  {
    path: '/top',
    name: 'Top',
    component: Top,
    beforeEnter: checkIfAuthenticated,
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    beforeEnter: checkIfAuthenticated,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'hash', // TODO: Mirar si con 'hash' funciona bien
  base: process.env.BASE_URL,
  routes,
});

export default router;
