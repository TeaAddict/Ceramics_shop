export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function formatToEuroCurrency(number: number): string {
  // Use Intl.NumberFormat to format the number as Euro currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  // Format the number and return the result
  return formatter.format(number);
}
