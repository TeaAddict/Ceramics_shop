export function parseDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const res = `${day}/${month}/${year}`;
  return res;
}
