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
  courseId: number;
  availableCourseId: number;
  course: Course;
};

type AvailableCourse = {
  id: number;
  year: number;
  term: Term;
  availableCourseItems: AvailableCourseItem[];
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

        return !this.currentAvailableCourse?.availableCourseItems.some(
          (availableCourseItem: AvailableCourseItem) =>
            availableCourseItem.courseId === course.id
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

    async addAvailableCourseItem(body: {
      courseId: number;
      year: number;
      term: Term;
    }) {
      try {
        await axiosClient.post('/course-open', body);
        this.getAvailableCourseByYearAndTerm();
        toast('Thêm môn học mở thành công');
      } catch (error) {
        toast('Thêm môn học mở thất bại');
      }
    },

    async deleteAvailableCourseItem(
      courseId: number,
      availableCourseId: number
    ) {
      try {
        await axiosClient.delete(
          `/course-open/${courseId}/${availableCourseId}`
        );
        this.getAvailableCourseByYearAndTerm();
        toast('Xóa môn học mở thành công');
      } catch (error) {
        toast('Xóa môn học mở thất bại');
      }
    },

    updateSearchQuery(value: string) {
      this.searchQuery = value;
      this.getCourses();
    },
  },
});

export { useAvailableCourseStore };
