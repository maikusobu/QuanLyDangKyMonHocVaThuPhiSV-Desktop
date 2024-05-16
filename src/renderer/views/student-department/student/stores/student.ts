import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';
import { toast } from '../../../../../utils/toast';
import { arrayToObject } from '../../../../../utils/arrayToObject';

type Faculty = {
  id: number;
  name: string;
};
export type Major = {
  id: number;
  name: string;
  facultyId: number;
  faculty: Faculty;
};
type Province = {
  id: number;
  name: string;
};
type Priority = {
  id: number;
  name: string;
  discountPercentage: number;
};
type District = {
  id: number;
  name: string;
  isMinor: boolean;
  provinceId: number;
  province: Province;
};
export type Student = {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  districtId: number;
  priorityId: number;
  district: District;
  priority: Priority;
  majorId: number;
  major: Major;
};

enum TypeQuery {
  name = 'name',
  mssv = 'mssv',
}

type OpenCourse = {
  id: number;
  name: string;
  numberOfPeriods: number;
  facultyId: number;
};
type courseType = {
  id: number;
  name: string;
  unitPrice: number;
};
export const useStudentStore = defineStore('student', {
  state: () => ({
    currentStudent: null as Student | null,
    students: [] as Student[],
    priorities: [] as Priority[],
    provinces: [] as Province[],
    districts: [] as District[],
    openCourses: [] as OpenCourse[],
    courseTypes: [] as courseType[],
    majors: [] as Major[],
    page: 1,
    errorMessages: {} as Record<string, any>,
    search: {
      query: '',
      typeQuery: TypeQuery.name,
    },
  }),
  getters: {
    getErrorMessages() {
      return this.errorMessages;
    },
    getQuery() {
      return this.search.query;
    },
  },
  actions: {
    async fetchStudents(queryString: string, isSeach = false) {
      const query = `?${this.search.typeQuery}=${queryString}`;
      if (isSeach) {
        this.page = 1;
        this.students = [];
      }
      const response = await axiosClient.get(
        `/student${query}&page=${this.page}`,
        {
          id: `list-student-${this.page}-${this.search.typeQuery}-${this.search.query}`,
        }
      );
      this.students.push(...response.data);
    },

    async getPriorities() {
      const response = await axiosClient.get('/priority');
      this.priorities = response.data;
    },

    async addStudent(student: { [p: string]: string | File }) {
      try {
        await axiosClient.post('/student', student, {
          cache: {
            update: {
              [`list-student-${this.page}-${this.search.typeQuery}-${this.search.query}`]:
                (listCache, createPost) => {
                  if (listCache.state !== 'cached') {
                    return 'ignore';
                  }
                  const studentCreated = createPost.data[0];
                  studentCreated['major'] = this.majors.find(
                    (major: any) => major.id === studentCreated.majorId
                  );
                  studentCreated['priority'] = this.priorities.find(
                    (priority: any) => priority.id === studentCreated.priorityId
                  );
                  studentCreated['district'] = this.districts.find(
                    (district: any) => district.id === studentCreated.districtId
                  );
                  if (Array.isArray(listCache.data.data)) {
                    listCache.data.data = [
                      studentCreated,
                      ...listCache.data.data,
                    ];
                  }
                  this.students = [studentCreated, ...this.students];
                  return listCache;
                },
            },
            ttl: 0,
          },
        });
        toast('Thêm sinh viên thành công', 'success');
      } catch (error) {
        toast('Thêm sinh viên thất bại', 'error');
        this.errorMessages = arrayToObject(error.response.data.message) || {};
      }
    },
    async getProvince() {
      const response = await axiosClient.get('/province', {
        id: 'list-province',
      });
      this.provinces = response.data;
    },
    async getDistrict(provinceId: number) {
      const response = await axiosClient.get(
        `/province/district/${provinceId}`,

        {
          id: `list-district-${provinceId}`,
        }
      );
      this.districts = response.data;
    },
    async updateStudent(student: Partial<Student>) {
      try {
        await axiosClient.patch(`/student/${this.currentStudent.id}`, student, {
          cache: {
            update: {
              [`list-student-${this.page}-${this.search.typeQuery}-${this.search.query}`]:
                (listCache, createPost) => {
                  if (listCache.state !== 'cached') {
                    return 'ignore';
                  }
                  const studentUpdated = createPost.data[0];
                  studentUpdated['major'] = this.majors.find(
                    (major: any) => major.id === studentUpdated.majorId
                  );
                  studentUpdated['priority'] = this.priorities.find(
                    (priority: any) => priority.id === studentUpdated.priorityId
                  );
                  studentUpdated['district'] = this.districts.find(
                    (district: any) => district.id === studentUpdated.districtId
                  );
                  if (Array.isArray(listCache.data.data)) {
                    listCache.data.data = listCache.data.data.map((student) =>
                      student.id === studentUpdated.id
                        ? studentUpdated
                        : student
                    );
                  }
                  this.students = this.students.map((student: any) =>
                    student.id === studentUpdated.id ? studentUpdated : student
                  );

                  return listCache;
                },
            },
            ttl: 0,
          },
        });
        toast('Cập nhật sinh viên thành công', 'success');
      } catch (error) {
        toast('Cập nhật sinh viên thất bại', 'error');

        this.errorMessages = arrayToObject(error.response.data.message) || {};
      }
    },
    async getMajors() {
      const response = await axiosClient.get('/major');
      this.majors = response.data;
    },
    async deleteStudent(id: number | string) {
      try {
        await axiosClient.delete(`/student/${id}`, {
          cache: {
            update: {
              [`list-student-${this.page}-${this.search.typeQuery}-${this.search.query}`]:
                (listCache) => {
                  if (listCache.state !== 'cached') {
                    return 'ignore';
                  }
                  if (Array.isArray(listCache.data.data)) {
                    listCache.data.data = listCache.data.data.filter(
                      (student) => student.id !== id
                    );
                  }
                  this.students = this.students.filter(
                    (student: any) => student.id !== id
                  );
                  return listCache;
                },
            },
          },
        });
        toast('Xóa sinh viên thành công', 'success');
        this.currentStudent = null;
      } catch (error) {
        toast('Xóa sinh viên thất bại', 'error');
      }
    },
    async getOpenCourses() {
      const response = await axiosClient.get('/open-course', {
        id: 'list-open-course',
      });
      this.openCourses = response.data;
    },
    async getCourseTypes() {
      const response = await axiosClient.get('/course-type', {
        id: 'list-course-type',
      });
      this.courseTypes = response.data;
    },
    async updateStudentCourses(studentId: number, courseIds: number[]) {},
    selectTypeQuery(value: TypeQuery) {
      this.search.typeQuery = value;
    },
    selectStudent(student: Student) {
      this.currentStudent = student;
    },
    updateSearchQuery(value: string) {
      this.search.query = value;
    },
    clearErrorMessages() {
      this.errorMessages = {};
    },
  },
});
