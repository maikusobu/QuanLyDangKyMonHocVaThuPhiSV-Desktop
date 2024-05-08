import { defineStore } from 'pinia';
import { axiosClient } from '../../../../../api/axiosClient';

type CurrentTerm = {
  year: number;
  term: number;
};

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    currentTerm: convertDateToTerm(new Date()),
  }),
});

function convertDateToTerm(time: Date): CurrentTerm {
  const month = time.getMonth();
  const year = time.getFullYear();
  let term: CurrentTerm;
  switch (true) {
    case month >= 1 && month <= 5:
      term = { year: year, term: 2 };
    case month >= 6 && month <= 7:
      term = { year: year, term: 3 };
    default:
      term = { year: year + 1, term: 1 };
  }

  return term;
}
