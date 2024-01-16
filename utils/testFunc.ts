"use client";

export function testFunc(someArr: { [key: string]: string }[]) {
  let propCount: { [key: string]: number } = {};

  someArr.forEach((item) => {
    // let propKey: string = item[someProp];
    // propCount[propKey] = (propCount[propKey] || 0) + 1;
    // return propCount;
  });
}
