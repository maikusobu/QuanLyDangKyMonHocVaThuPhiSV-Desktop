import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';

export const useCourseStore = defineStore('course', {
  state: () => ({
    currentCourse: null,
    courses: [],
    faculties: [],
    courseTypes: [],
    searchQuery: '',
  }),
  actions: {
    async getCourses() {
      const response = await axiosClient.get(
        `/course?search=${this.searchQuery}`
      );
      this.courses = response.data;
    },

    async getFaculties() {
      const response = await axiosClient.get('/faculty');
      this.faculties = response.data;
    },

    async getCourseTypes() {
      const response = await axiosClient.get('/course-type');
      this.courseTypes = response.data;
    },

    async getCourse(id: number | string) {
      const response = await axiosClient.get(`/course/${id}`);
      this.currentCourse = response.data;
    },

    async addCourse(course: any) {
      await axiosClient.post('/course', course);
      this.getCourses();
    },

    async updateCourse(id: number | string) {
      await axiosClient.put(`/course/${id}`, this.currentCourse);
      this.getCourses();
    },

    async deleteCourse(id: number | string) {
      await axiosClient.delete(`/course/${id}`);
      this.getCourses();
    },

    updateSearchQuery(value: string) {
      this.searchQuery = value;
      this.getCourses();
    },
  },
});
