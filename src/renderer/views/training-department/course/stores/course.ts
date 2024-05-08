import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';

const useCourseStore = defineStore('course', {
  state: () => ({
    currentCourse: null,
    courses: [],
    faculties: [],
    courseTypes: [],
    errorMessages: [],
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

    async addCourse(course: any) {
      try {
        await axiosClient.post('/course', course);
        this.errorMessages = [];
        this.getCourses();
      } catch (error) {
        const errorMessages = error.response.data.message || [];
        this.errorMessages = errorMessages;
      }
    },

    async updateCourse(course: any) {
      try {
        await axiosClient.patch(`/course/${this.currentCourse.id}`, course);
        this.currentCourse = course;
        this.errorMessages = [];
        this.getCourses();
      } catch (error) {
        const errorMessages = error.response.data.message || [];
        this.errorMessages = errorMessages;
      }
    },

    async deleteCourse(id: number | string) {
      await axiosClient.delete(`/course/${id}`);
      this.currentCourse = null;
      this.getCourses();
    },

    updateSearchQuery(value: string) {
      this.searchQuery = value;
      this.getCourses();
    },

    clearErrorMessages() {
      this.errorMessages = [];
    },

    setCurrentCourse(course: any) {
      this.currentCourse = course;
    },
  },
});

export { useCourseStore };
