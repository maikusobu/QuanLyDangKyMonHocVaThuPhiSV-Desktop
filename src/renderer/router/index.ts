import { RouteRecordRaw, createMemoryHistory, createRouter } from 'vue-router';
import Login from '../views/Login.vue';
import Course from '../views/course/Course.vue';
import Finance from '../views/finance/finance.vue';
import Student from '../views/student/student.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/course',
    component: Course,
  },
  {
    path: '/finance',
    component: Finance,
  },
  {
    path: '/student',
    component: Student,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
