/**
Converts a currency string to a negative number format.

@param currencyString - The currency string to convert (Expected Input: R$ 1000).
@returns The currency string converted to a negative number format.
@example
// Example usage:
// Returns: "R$ -1000"
formatCurrencyStringToNegativeNumber("R$ 1000");
*/

export const formatCurrencyStringToNegativeNumber = (
  currencyString: string
) => {
  const currencySimbol = currencyString.slice(0, 3);
  const currencyNumber = currencyString.slice(3);

  const currencyStringNegative = `${currencySimbol} - ${currencyNumber}`;
  return currencyStringNegative;
};
