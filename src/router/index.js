import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../pages/HomePage.vue'),
    },
    {
      path: '/movie/:id',
      name: 'Movie',
       component: () => import(/* webpackChunkName: "movie" */ '../pages/MoviePage.vue'),
    },
  ],
});
