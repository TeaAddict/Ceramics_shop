export function countProperties(
  someArr: { [key: string]: number | string | object }[],
  someProp: string
) {
  let propCount: { [key: string]: number } = {};

  someArr.forEach((item) => {
    let propKey: string = String(item[someProp]);
    propCount[propKey] = (propCount[propKey] || 0) + 1;
  });

  const resultArray = Object.keys(propCount).map((propKey) => ({
    label: propKey,
    value: propCount[propKey],
  }));

  return resultArray;
}
