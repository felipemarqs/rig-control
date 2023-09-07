export const formatIsoStringToHours = (isoString: string) => {
  const res = isoString.split("T");

  return res[1].slice(0, 5);
};
