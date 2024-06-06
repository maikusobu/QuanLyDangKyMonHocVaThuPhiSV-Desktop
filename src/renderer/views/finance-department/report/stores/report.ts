import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';

enum Term {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

enum Status {
  ALL = 'ALL',
  PENDING = 'PENDING',
  PAID = 'PAID',
}

type Report = {
  id: number;
  totalPaid: number;
  studentId: number;
  studentName: string;
  totalRegister: number;
  totalActual: number;
};

type State = {
  reports: Report[];
  year: number;
  term: Term;
  status: Status;
  studentName: string;
};

const useReportStore = defineStore('report', {
  state: (): State => ({
    reports: [],
    year: new Date().getFullYear(),
    term: Term.FIRST,
    status: Status.ALL,
    studentName: '',
  }),

  actions: {
    async getReports() {
      const response = await axiosClient.get(
        `/payment?year=${this.year}&term=${this.term}&status=${this.status}&studentName=${this.studentName}`,
        {
          id: `list-report`,
          cache: {
            update: {
              [`list-report`]: 'delete',
            },
          },
        }
      );

      console.log(response.data);

      this.reports = response.data;
    },
  },
});

export { useReportStore };
