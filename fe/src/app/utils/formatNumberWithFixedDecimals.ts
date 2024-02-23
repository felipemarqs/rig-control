/**
Formats a number with a fixed number of decimal places.
@param number - the number to format
@param decimalPlaces - the number of decimal places to preserve
@returns the formatted number
 */
export function formatNumberWithFixedDecimals(
  number: number,
  decimalPlaces: number
): number {
  return Number(number.toFixed(decimalPlaces));
}
