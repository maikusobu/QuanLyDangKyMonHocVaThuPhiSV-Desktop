import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';
import {
  getTermYear,
  resolveTerm,
} from '../../../../../utils/resolveCurrentTerm';
import { Major } from './student';
import { toast } from '../../../../../utils/toast';

type Faculty = {
  id: number;
  name: string;
};

export type OpenCourse = {
  id: number;
  name: string;
  numberOfPeriods: number;
  facultyId: number;
  faculty: Faculty;
  courseType: CourseType;
};
type CourseType = {
  id: number;
  name: string;
  unitPrice: number;
};
export type MajorWithCourse = {
  name: string;
  courses: Pick<OpenCourse, 'name' | 'id'>[];
};
type CurrentTermYearRegistration = {
  _id: string;
  major: Major;
  courses: OpenCourse[];
};
export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    currentMajor: '',
    isAvailable: false as boolean,
    stateId: '' as string,
    openCourses: [] as OpenCourse[],
    courseTypes: [] as CourseType[],
    availableCourseId: null as number | null,
    currentTermYearRegistration: [] as CurrentTermYearRegistration[],
  }),
  actions: {
    async getOpenCourses() {
      const current = getTermYear();
      const term = resolveTerm(current.term);
      const response = await axiosClient.get(
        `/course-open?term=${term}&year=${current.year}`
      );
      const data = response.data;
      this.availableCourseId = data.availableCourseId;
      this.openCourses = data.availableCourses.map((item: any) => item.course);
      this.openCourses = this.openCourses.filter(
        (e: any) => e.isDeleted === false
      );
    },
    async getCourseTypes() {
      const response = await axiosClient.get('/course-type');
      this.courseTypes = response.data;
    },
    async submitRegistration(majorId: number, courseIds: number[]) {
      try {
        const response = await axiosClient.post('/course-registration', {
          majorId,
          stateId: this.stateId,
          courses: courseIds,
        });
        toast('Đăng ký thành công', 'success');
        await this.getCurrentTermYearRegistration();
      } catch (error) {
        toast('Đăng ký không thành công', 'error');
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else {
          console.error('Error message:', error.message);
        }
      }
    },
    async closeCurrentState() {
      const userConfirmed = confirm('Bạn muốn đóng đăng ký?');
      if (!userConfirmed) {
        return;
      }

      const current = getTermYear();
      const term = resolveTerm(current.term).toLowerCase();
      const year = parseInt(String(current.year), 10);

      const validTerms = ['first', 'second', 'third'];
      if (!validTerms.includes(term)) {
        console.error(
          `Invalid term value: ${term}. Expected one of: ${validTerms.join(', ')}`
        );
        return;
      }

      // Ensure year is an integer
      if (!Number.isInteger(year)) {
        console.error(`Invalid year value: ${year}. Expected an integer.`);
        return;
      }

      try {
        const response = await axiosClient.patch(
          `/course-registration/current-state?term=${term}&year=${year}`
        );
        await this.getCurrentTermYearRegistration();
        toast('Đóng đăng ký thành công', 'success');
      } catch (error) {
        toast('Đóng đăng ký thất bại', 'error');
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else {
          console.error('Error message:', error.message);
        }
      }
    },

    async deleteRegistration(courseRegistrationId: string) {
      try {
        const response = await axiosClient.post(`/course-registration/delete`, {
          courseRegistrationId,
          stateId: this.stateId,
        });
        toast('Xóa đăng ký thành công', 'success');
        await this.getCurrentTermYearRegistration();
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else {
          toast('Xóa đăng ký thất bại', 'error');
          console.error('Error message:', error.message);
        }
      }
    },
    async getCurrentTermYearRegistration() {
      const current = getTermYear();
      const term = resolveTerm(current.term);
      const response = await axiosClient.get(
        `/course-registration?term=${term}&year=${current.year}`,
        {
          id: `course-registration-${term}-${current.year}`,
          cache: {
            update: {
              [`course-registration-${term}-${current.year}`]: 'delete',
            },
          },
        }
      );

      this.currentTermYearRegistration = response.data.registrations;
      this.currentTermYearRegistration.forEach((item: any) => {
        item.courses = item.courses.filter((e: any) => e.isDeleted === false);
      });
      this.isAvailable = response.data.available;
      this.stateId = response.data.stateId;
    },
  },
});
