function updateObjectInArray<T>(
  initialArray: T[],
  keyToFind: string,
  keyValueToFind: any,
  patch: Partial<T>
): T[] {
  return initialArray.map((obj) => {
    if (obj[keyToFind] === keyValueToFind) {
      Object.assign(obj, patch);
    }
    return obj;
  });
}
