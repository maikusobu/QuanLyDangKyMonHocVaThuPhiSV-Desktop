import { RouterOptions, createMemoryHistory, createRouter } from 'vue-router';

import Login from '../views/Login.vue';
import Course from '../views/course/Course.vue';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    // redirect: '/auth/login',
    component: Course,
  },
  {
    path: '/auth/login',
    component: Login,
  },
  {
    path: '/course',
    component: Course,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
