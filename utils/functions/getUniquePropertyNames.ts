export function getUniquePropertyNames(
  arr: { [key: string]: any }[],
  name: string
): any[] {
  const uniqueNames = arr
    .map((el) => el[name].toLowerCase())
    .filter((val: string, index, arr) => arr.indexOf(val) === index);

  return uniqueNames;
}
