export const formatDate = (date: Date) => {
  if (date.toString() === "Invalid Date") {
    return Intl.DateTimeFormat("pt-br").format(new Date());
  }

  return Intl.DateTimeFormat("pt-br").format(date);
};
