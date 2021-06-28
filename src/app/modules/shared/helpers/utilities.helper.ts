export const uniqueArrayOfObject = (array: any[], keyToBeUnique: string) => {
  // Filter by looking at the next objects if the key is present a second time
  return array.filter((x, xi) => !array.slice(xi + 1).some(y => y[keyToBeUnique] === x[keyToBeUnique]));
};
export const isEmpty = (obj: Object) => Object.keys(obj).length === 0 && obj.constructor === Object;
export const upperFirst = (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '');
export const get = (obj: Object, path: string, defaultValue?: any) => {
  const result = String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res: any, key: string) => (res !== null && res !== undefined ? res[key] : res), obj);
  return result === undefined || result === obj ? defaultValue : result;
};

export function filterUndefined<T>(ts: (T | undefined)[]): T[] {
  return ts.filter((t: T | undefined): t is T => !!t);
}

function* rangeGenerator(start: number, end: number): Generator<number> {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export function roundToTwoDigitsAfterComma(floatNumber: number): number {
  return parseFloat((Math.round(floatNumber * 100) / 100).toFixed(2));
}

export const range = (start: number, end: number) => [...rangeGenerator(start, end)];
