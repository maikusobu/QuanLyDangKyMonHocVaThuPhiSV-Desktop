import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';
import {
  getTermYear,
  resolveTerm,
} from '../../../../../utils/resolveCurrentTerm';

type OpenCourse = {
  id: number;
  name: string;
  numberOfPeriods: number;
  facultyId: number;
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
  term: number;
  year: number;
  majors: MajorWithCourse[];
};
export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    currentMajor: '',
    openCourses: [] as OpenCourse[],
    courseTypes: [] as CourseType[],
    currentTermYearRegistration: null as CurrentTermYearRegistration | null,
  }),
  actions: {
    async getOpenCourses() {
      const response = await axiosClient.get('/open-course');
      this.openCourses = response.data;
    },
    async getCourseTypes() {
      const response = await axiosClient.get('/course-type');
      this.courseTypes = response.data;
    },
    async getCurrentTermYearRegistration() {
      const current = getTermYear();
      const term = resolveTerm(current.term);
      const response = await axiosClient.get(
        `/course-registration/current?term=${term}&year=${current.year}`
      );
      this.currentTermYearRegistration = response.data;
    },
  },
});
