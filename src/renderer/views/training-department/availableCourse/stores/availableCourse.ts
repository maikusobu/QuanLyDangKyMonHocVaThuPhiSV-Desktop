import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';
import { toast } from '../../../../../utils/toast';

enum Term {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

type Course = {
  id: number;
  name: string;
  numberOfPeriods: number;
  courseTypeId: number;
  facultyId: number;
  faculty: {
    id: number;
    name: string;
  };
  courseType: {
    id: number;
    name: string;
  };
};

type AvailableCourseItem = {
  course: Course;
};

type AvailableCourse = {
  availableCourseId: number;
  available: boolean;
  availableCourses: AvailableCourseItem[];
};

type State = {
  year: number;
  term: Term;
  currentAvailableCourse: AvailableCourse | null;
  courses: Course[];
  searchQuery: string;
};

const useAvailableCourseStore = defineStore('available_course', {
  state: (): State => ({
    year: new Date().getFullYear(),
    term: Term.FIRST,
    courses: [],
    currentAvailableCourse: null,
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
      this.courses = (response.data as Course[]).filter((course) => {
        if (!this.currentAvailableCourse) {
          return true;
        }

        return !this.currentAvailableCourse?.availableCourses.some(
          (availableCourseItem: AvailableCourseItem) =>
            availableCourseItem.course.id === course.id
        );
      });
    },

    async getAvailableCourseByYearAndTerm() {
      const response = await axiosClient.get(
        `/course-open?year=${this.year}&term=${this.term}`,
        {
          id: `available-course-${this.year}-${this.term}`,
          cache: {
            update: {
              [`available-course-${this.year}-${this.term}`]: 'delete',
            },
          },
        }
      );
      this.currentAvailableCourse = response.data;
      this.getCourses();
    },

    async addAvailableCourseItems(body: {
      courses: number[];
      availableCourseId: number;
    }) {
      try {
        await axiosClient.post('/course-open', body);
        this.getAvailableCourseByYearAndTerm();
        toast('Thêm môn học mở thành công', 'success');
      } catch (error) {
        toast('Thêm môn học mở thất bại', 'error');
      }
    },

    async deleteAvailableCourseItem(body: {
      courses: number[];
      availableCourseId: number;
    }) {
      try {
        await axiosClient.post('/course-open/delete', body);
        this.getAvailableCourseByYearAndTerm();
        toast('Xóa môn học mở thành công', 'success');
      } catch (error) {
        toast('Xóa môn học mở thất bại', 'error');
      }
    },

    async closeAvailableCourse(availableCourseId: number) {
      try {
        await axiosClient.patch(`/course-open/${availableCourseId}`);
        this.getAvailableCourseByYearAndTerm();
        toast('Đóng môn học mở thành công', 'success');
      } catch (error) {
        toast('Đóng môn học mở thất bại', 'error');
      }
    },

    updateSearchQuery(value: string) {
      this.searchQuery = value;
      this.getCourses();
    },
  },
});

export { useAvailableCourseStore };
