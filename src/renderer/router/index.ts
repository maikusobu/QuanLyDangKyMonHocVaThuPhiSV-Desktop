import { RouteRecordRaw, createMemoryHistory, createRouter } from 'vue-router';

import Login from '../views/Login.vue';
import Course from '../views/course/Course.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/course',
  },
  {
    path: '/auth/login',
    component: Login,
    meta: {
      layout: 'EmptyLayout',
    },
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
