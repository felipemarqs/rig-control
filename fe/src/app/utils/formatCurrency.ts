/**
Formats a number as currency in Brazilian Real (BRL).

@param value - The number to format as currency.
@returns The formatted currency string.
@example
// Example usage:
// Returns: R$ 1.234,56
formatCurrency(1234.56);
*/

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
