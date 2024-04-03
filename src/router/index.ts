import { RouterOptions, createMemoryHistory, createRouter } from 'vue-router';

import Login from '../views/Login.vue';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/auth/login',
  },
  {
    path: '/auth/login',
    component: Login,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
