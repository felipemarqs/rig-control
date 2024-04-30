/**
Gets the current date and time in ISO string format adjusted to the GMT-3 timezone.

@returns The current date and time in ISO string format adjusted to GMT-3 timezone.
@example
// Example usage:
// Returns: "2024-04-25T12:00:00.000Z" (if current time is 2024-04-25T15:00:00.000Z)
getCurrentISOString();
*/

export const getCurrentISOString = () => {
  return new Date(Number(new Date()) - 1000 * 60 * 60 * 3).toISOString();
};
