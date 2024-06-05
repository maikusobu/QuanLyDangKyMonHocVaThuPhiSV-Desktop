export function getTermYear() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  let term;

  if (month >= 1 && month <= 4) {
    term = 'kì 1';
  } else if (month >= 5 && month <= 8) {
    term = 'kì 2';
  } else {
    term = 'kì 3';
  }

  return { term: term, year: year };
}

export function resolveTerm(term: string) {
  if (term === 'kì 1') {
    return 'first';
  } else if (term === 'kì 2') {
    return 'second';
  } else {
    return 'third';
  }
}
