import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';
import { toast } from '../../../../../utils/toast';
import { arrayToObject } from '../../../../../utils/arrayToObject';

const useCourseStore = defineStore('course', {
  state: () => ({
    currentCourse: null,
    courses: [],
    faculties: [],
    courseTypes: [],
    errorMessages: {},
    searchQuery: '',
  }),
  actions: {
    async getCourses() {
      const response = await axiosClient.get(
        `/course?search=${this.searchQuery}`,
        {
          id: `list-course`,
          cache: {
            update: {
              [`list-course`]: 'delete',
            },
          },
        }
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
        this.clearErrorMessages();
        this.getCourses();
        toast('Thêm khóa học thành công', 'success');
      } catch (error) {
        this.errorMessages = arrayToObject(error.response.data.message) || {};
        toast('Thêm khóa học thất bại', 'error');
      }
    },

    async updateCourse(course: any) {
      try {
        await axiosClient.patch(`/course/${this.currentCourse.id}`, course);
        this.clearErrorMessages();
        this.getCourses();
        toast('Cập nhật khóa học thành công', 'success');
      } catch (error) {
        this.errorMessages = arrayToObject(error.response.data.message) || {};
        toast('Cập nhật khóa học thất bại', 'error');
      }
    },

    async deleteCourse(id: number | string) {
      try {
        await axiosClient.delete(`/course/${id}`);
        this.currentCourse = null;
        this.getCourses();
        toast('Xóa khóa học thành công', 'success');
      } catch (error) {
        toast('Xóa khóa học thất bại', 'error');
      }
    },

    updateSearchQuery(value: string) {
      this.searchQuery = value;
      this.getCourses();
    },

    clearErrorMessages() {
      this.errorMessages = {};
    },

    setCurrentCourse(course: any) {
      this.currentCourse = course;
    },
  },
});

export { useCourseStore };
