export const currencyStringToNumber = (value: string) => {
  if (typeof value === "number") {
    return;
  }
  const sanitizedString = value.replace(/\./g, "").replace(",", ".");
  console.log("sanitizedString", sanitizedString);
  return Number(sanitizedString);
};
