import { RouteRecordRaw, createMemoryHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/admin/Admin.vue';
import TrainingDepartment from '../views/training-department/TrainingDepartment.vue';
import FinanceDepartment from '../views/finance-department/FinanceDepartment.vue';
import Course from '../views/training-department/course/Course.vue';
import StudentDepartment from '../views/student-department/StudentDepartment.vue';
import Student from '../views/student-department/student/Student.vue';
import resolveDepartmentRoute from '../../utils/resolveDepartmentRoute';
import getSession from '../../utils/getSession';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    beforeEnter: () => {
      const userSession = getSession();
      if (!userSession) {
        return '/login';
      }
      if (userSession.role === 'admin') {
        return '/admin';
      }
      if (userSession.role === 'employee') {
        return resolveDepartmentRoute(userSession.department);
      }
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin', // admin
    component: Admin,
  },
  {
    path: '/training-department', // phòng đào tạo
    component: TrainingDepartment,
    children: [
      {
        path: 'course',
        component: Course,
      },
    ],
  },
  {
    path: '/finance-department', // phòng kế hoạch tài chính
    component: FinanceDepartment,
    children: [],
  },
  {
    //cải thiện load khi cần thiết //
    path: '/student-department', // phòng công tác sinh viên
    component: StudentDepartment,
    children: [
      {
        path: 'student',
        component: Student,
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
