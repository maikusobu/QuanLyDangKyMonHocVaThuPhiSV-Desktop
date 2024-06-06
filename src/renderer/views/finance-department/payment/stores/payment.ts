import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';

enum Term {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

type Payment = {
  id: number;
  ammount: number;
  paymentDate: string;
  year: number;
  term: Term;
  studentId: number;
  studentName: string;
};

type State = {
  payments: Payment[];
  year: number;
  term: Term;
  studentName: string;
};

const usePaymentStore = defineStore('payment', {
  state: (): State => ({
    payments: [],
    year: new Date().getFullYear(),
    term: Term.FIRST,
    studentName: '',
  }),

  actions: {
    async getPayments() {
      const response = await axiosClient.get(
        `/payment/history?year=${this.year}&term=${this.term}&studentName=${this.studentName}`,
        {
          id: `list-payment`,
          cache: {
            update: {
              [`list-payment`]: 'delete',
            },
          },
        }
      );

      this.payments = response.data;
    },
  },
});

export { usePaymentStore };
