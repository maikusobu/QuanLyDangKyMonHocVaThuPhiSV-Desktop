import { RouteRecordRaw, createMemoryHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/admin/Admin.vue';
import TrainingDepartment from '../views/training-department/TrainingDepartment.vue';
import FinanceDepartment from '../views/finance-department/FinanceDepartment.vue';
import Course from '../views/training-department/course/Course.vue';
import StudentDepartment from '../views/student-department/StudentDepartment.vue';
import Student from '../views/student-department/student/Student.vue';
import Program from '../views/training-department/program/Program.vue';
import AvailableCourse from '../views/training-department/availableCourse/AvailableCourse.vue';
import Payment from '../views/finance-department/payment/Payment.vue';
import Report from '../views/finance-department/report/Report.vue';
import CourseRegistration from '../views/student-department/student/CourseRegistration.vue';
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
      {
        path: 'program',
        component: Program,
      },
      {
        path: 'available-course',
        component: AvailableCourse,
      },
    ],
  },
  {
    path: '/finance-department', // phòng kế hoạch tài chính
    component: FinanceDepartment,
    children: [
      {
        path: 'payment',
        component: Payment,
      },
      {
        path: 'report',
        component: Report,
      },
    ],
  },
  {
    path: '/student-department', // phòng công tác sinh viên
    component: StudentDepartment,
    children: [
      {
        path: 'student',
        component: Student,
      },
      {
        path: 'course-registration',
        component: CourseRegistration,
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
