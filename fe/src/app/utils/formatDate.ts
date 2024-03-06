export const formatDate = (date: Date) => {
  console.log("Date comeing", date);
  return Intl.DateTimeFormat("pt-br").format(date);
};
