/**
Formats a number with a fixed number of decimal places.

@desc
This function takes a number and formats it with a fixed number of decimal places.
It uses the Number.toFixed() method to achieve this.

@param number - The number to format.
@param decimalPlaces - The number of decimal places to preserve.
@returns The formatted number.
@example
// Example usage:
// Returns: 123.46
formatNumberWithFixedDecimals(123.456789, 2);
*/
export function formatNumberWithFixedDecimals(
  number: number,
  decimalPlaces: number
): number {
  return Number(number.toFixed(decimalPlaces));
}
