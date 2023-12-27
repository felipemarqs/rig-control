export function getTotalHoursFromTimeString(timeString: string | undefined) {
  if (timeString === undefined || timeString === "") {
    return 0;
  }

  const [hours, minutes] = timeString.split(":").map(Number);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours >= 24 ||
    minutes < 0 ||
    minutes >= 60
  ) {
    throw new Error("Invalid time format");
  }

  return (hours * 60 + minutes) / 60;
}
