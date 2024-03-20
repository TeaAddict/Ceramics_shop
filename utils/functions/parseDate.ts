export function parseDate(date: Date) {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();

  const res = `${day < 10 ? `0${day.toString()}` : day}/${
    month < 10 ? `0${month.toString()}` : month
  }/${year}`;
  return res;
}
