export function arrayToObject(array: string[]) {
  const result: Record<string, any> = {};

  array.forEach((item) => {
    const [key, ...value] = item.split(' ');
    result[key] = value.join(' ');
  });

  return result;
}
