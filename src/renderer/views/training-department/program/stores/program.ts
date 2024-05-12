import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';
import { toast } from '../../../../../utils/toast';
import { arrayToObject } from '../../../../../utils/arrayToObject';

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
};

type ProgramItem = {
  id: number;
  programId: number;
  courseId: number;
  term: Term;
  note: string;
  course: Course;
};

type Major = {
  id: number;
  name: string;
  facultyId: number;
};

type Program = {
  id: number;
  majorId: number;
  major: Major;
  programItems: ProgramItem[];
};

type State = {
  majors: Major[];
  courses: Course[];
  currentProgram: Program | null;
  currentProgramItem: ProgramItem | null;
  errorMessages: Record<string, string>;
  searchQuery: string;
};

const useProgramStore = defineStore('program', {
  state: (): State => ({
    majors: [],
    courses: [],
    currentProgram: null,
    currentProgramItem: null,
    errorMessages: {},
    searchQuery: '',
  }),
  actions: {
    async getMajors() {
      const response = await axiosClient.get('/major');
      this.majors = response.data;
      await this.getProgramByMajorId(this.majors[0].id);
    },

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

    async getProgramByMajorId(majorId: number) {
      const response = await axiosClient.get(`/major/${majorId}/program`, {
        id: `program-major-${majorId}`,
        cache: {
          update: {
            [`program-major-${majorId}`]: 'delete',
          },
        },
      });
      this.currentProgram = response.data;
    },

    async addProgramItem(programItem: Partial<ProgramItem>) {
      try {
        console.log('programItem: ', programItem);
        await axiosClient.post('/program-item', programItem);
        this.clearErrorMessages();
        this.getProgramByMajorId(this.currentProgram?.majorId);
        toast('Thêm môn chương trình học thành công', 'success');
      } catch (error) {
        console.log(error);
        this.errorMessages = arrayToObject(error.response.data.message) || {};
        toast('Thêm môn chương trình học thất bại', 'error');
      }
    },

    async updateProgramItem(programItem: Partial<ProgramItem>) {
      try {
        await axiosClient.patch(
          `/program-item/${this.currentProgramItem?.id}`,
          programItem
        );
        this.clearErrorMessages();
        this.getProgramByMajorId(this.currentProgram?.majorId);
        toast('Cập nhật môn chương trình học thành công', 'success');
      } catch (error) {
        this.errorMessages = arrayToObject(error.response.data.message) || {};
        toast('Cập nhật môn chương trình học thất bại', 'error');
      }
    },

    async deleteProgramItem(id: number | string) {
      try {
        await axiosClient.delete(`/program-item/${id}`);
        this.currentProgramItem = null;
        this.getProgramByMajorId(this.currentProgram?.majorId);
        toast('Xóa môn chương trình học thành công', 'success');
      } catch (error) {
        toast('Xóa môn chương trình học thất bại', 'error');
      }
    },

    updateSearchQuery(value: string) {
      this.searchQuery = value;
      this.getCourses();
    },

    clearErrorMessages() {
      this.errorMessages = {};
    },

    setCurrentProgramItem(programItem: ProgramItem) {
      this.currentProgramItem = programItem;
    },
  },
});

export { useProgramStore };
