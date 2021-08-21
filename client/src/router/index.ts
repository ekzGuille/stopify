import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Redirect from '@/views/Redirect.vue';
import NotFound from '@/views/NotFound.vue';
import Top from '@/views/Top.vue';
import Me from '@/views/Me.vue';
import store from '@/store';
import { Routes } from '@/utils/constants';

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
    redirect: Routes.Top.route,
    name: Routes.Home.name,
    // component: Home,
  },
  {
    path: Routes.Redirect.route,
    name: Routes.Redirect.name,
    component: Redirect,
    beforeEnter: checkIfNotAuthenticated,
  },
  {
    path: Routes.Top.route,
    name: Routes.Top.name,
    component: Top,
    beforeEnter: checkIfAuthenticated,
  },
  {
    path: Routes.Me.route,
    name: Routes.Me.name,
    component: Me,
    beforeEnter: checkIfAuthenticated,
  },
  {
    path: Routes.NotFound.route,
    name: Routes.NotFound.name,
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
