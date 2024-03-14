export function sortTableBody(data: { [key: string]: any }[], sort: string) {
  const sortBy = sort.split("-");
  return data.sort((a, b) => {
    if (typeof a[sortBy[0]] === "object") {
      const numValA = (a[sortBy[0]] as Date).getTime();
      const numValB = (b[sortBy[0]] as Date).getTime();

      if (sortBy[1] === "asc") {
        const res = numValA - numValB;
        return res;
      } else {
        const res = numValB - numValA;
        return res;
      }
    }

    if (typeof a[sortBy[0]] === "string") {
      const lowerA = (a[sortBy[0]] as string).toLowerCase();
      const lowerB = (b[sortBy[0]] as string).toLowerCase();

      if (sortBy[1] === "asc") {
        if (lowerA < lowerB) {
          return 1;
        }
        if (lowerA > lowerB) {
          return -1;
        }
        return 0;
      } else {
        if (lowerA > lowerB) {
          return 1;
        }
        if (lowerA < lowerB) {
          return -1;
        }
        return 0;
      }
    }

    if (typeof a[sortBy[0]] === "number") {
      if (sortBy[1] === "asc") {
        const res = a[sortBy[0]] - b[sortBy[0]];
        return res;
      } else {
        const res = b[sortBy[0]] - a[sortBy[0]];
        return res;
      }
    }
    return 0;
  });
}
