import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';

type Faculty = {
  id: Number;
  name: String;
};
type Major = {
  id: Number;
  name: String;
  facultyId: Number;
  faculty: Faculty;
};
type Province = {
  id: Number;
  name: String;
};
type Priority = {
  id: Number;
  name: String;
  discountPercentage: Number;
};
type District = {
  id: Number;
  name: String;
  isMinor: Boolean;
  provinceId: Number;
  province: Province;
};
export type Student = {
  id: Number;
  name: String;
  dateOfBirth: String;
  gender: String;
  address: String;
  districtId: Number;
  priorityId: Number;
  district: District;
  priority: Priority;
  majorId: Number;
  major: Major;
};

enum TypeQuery {
  name = 'name',
  mssv = 'mssv',
}

function arrayToObject(array: string[]) {
  const result: Record<string, any> = {};

  array.forEach((item) => {
    const [key, ...value] = item.split(' ');
    result[key] = value.join(' ');
  });

  return result;
}

export const useStudentStore = defineStore('student', {
  state: () => ({
    currentStudent: null as Student | null,
    students: [] as Student[],
    priorities: [] as Priority[],
    provinces: [] as Province[],
    districts: [] as District[],
    majors: [] as Major[],
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
  },
  actions: {
    async fetchStudents(queryString: string) {
      const query = `?${this.search.typeQuery}=${queryString}`;
      const response = await axiosClient.get(`/student${query}`);
      this.students = response.data;
    },

    async getPriorities() {
      const response = await axiosClient.get('/priority');
      this.priorities = response.data;
    },

    async addStudent(student: { [p: string]: File | string }) {
      try {
        await axiosClient.post('/student', student);
      } catch (error) {
        this.errorMessages = arrayToObject(error.response.data.message) || {};
      }
    },
    async getProvince() {
      const response = await axiosClient.get('/province');
      this.provinces = response.data;
    },
    async getDistrict(provinceId: number) {
      const response = await axiosClient.get(
        `/province/district/${provinceId}`
      );

      this.districts = response.data;
      console.log(this.districts);
    },
    async updateStudent(student: Partial<Student>) {
      try {
        await axiosClient.patch(`/student/${this.currentStudent.id}`, student);
      } catch (error) {
        this.errorMessages = error.response.data.message || [];
      }
    },
    async getMajors() {
      const response = await axiosClient.get('/major');
      this.majors = response.data;
    },
    async deleteStudent(id: number | string) {
      await axiosClient.delete(`/student/${id}`);
      this.currentStudent = null;
    },
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
