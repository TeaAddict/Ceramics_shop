interface InputObject {
  [key: string]: any;
}

interface OutputObject {
  label: string;
  value: number;
}

export function processArray(inputArray: InputObject[]): OutputObject[] {
  const result: OutputObject[] = [];

  // Use an object to store counts for each category
  const categoryCounts: { [key: string]: number } = {};

  // Iterate through the input array
  for (const obj of inputArray) {
    if (obj.hasOwnProperty("category")) {
      const categoryValue = obj.category;

      // Increment count for the category
      categoryCounts[categoryValue] = (categoryCounts[categoryValue] || 0) + 1;
    }
  }

  // Create the output objects based on unique categories and their counts
  for (const categoryValue in categoryCounts) {
    if (categoryCounts.hasOwnProperty(categoryValue)) {
      const outputObj: OutputObject = {
        label: "category",
        value: categoryCounts[categoryValue],
      };
      result.push(outputObj);
    }
  }

  return result;
}

// Example usage:
const inputArray: InputObject[] = [
  { category: "A", otherKey: "value1" },
  { category: "B", otherKey: "value2" },
  { category: "A", otherKey: "value3" },
  { otherKey: "value4" }, // No category key in this object
];

const outputArray: OutputObject[] = processArray(inputArray);
