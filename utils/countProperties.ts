export function countProperties(
  someArr: { [key: string]: number | string }[],
  someProp: string
) {
  let propCount: { [key: string]: number } = {};

  someArr.forEach((item) => {
    let propKey: string = String(item[someProp]);
    propCount[propKey] = (propCount[propKey] || 0) + 1;
  });
  return propCount;
}
