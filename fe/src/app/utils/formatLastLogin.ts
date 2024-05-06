/**
Formats a date string representing the last login time.

@param dateString - The date string to format.
@returns The formatted last login string.
@example
// Example usage:
// Returns: "Último login: 25/04/2024 às 15:30 Horas" (if dateString is "2024-04-25T15:30:00.000Z")
formatLastlogin("2024-04-25T15:30:00.000Z");
*/
export const formatLastlogin = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if necessary
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Adding leading zero if necessary

  // Format the date and time
  const formattedDate = `${day}/${month}/${year} às ${hours}:${minutes} Horas`;

  return formattedDate;
};
