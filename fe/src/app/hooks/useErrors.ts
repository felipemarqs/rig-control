import {useState} from "react";

export type ErrorArgs = {fieldName: string; message: string};

/**
 * Hook for managing form field errors.
 * Keeps track of errors associated with form fields.
 * Provides functions to set, remove and retrieve error messages.
 * @returns An object containing functions to manage errors and the current error list.
 * @example
 * // Example usage:
 * const { setError, errors, removeError, getErrorMessageByFieldName } = useErrors();
 * setError({ fieldName: 'email', message: 'Invalid email format' });
 * removeError('email');
 * const errorMessage = getErrorMessageByFieldName('email');
 */

export const useErrors = () => {
  const [errors, setErrors] = useState<Array<ErrorArgs>>([]);

  /**
   * Sets an error message for a specific form field.
   * @param fieldName - The name of the form field.
   * @param message - The error message to set.
   */
  const setError = ({fieldName, message}: ErrorArgs) => {
    const errorAlreadyExists = errors.find(
      (error) => error.fieldName === fieldName
    );

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, {fieldName, message}]);
  };

  /**
   * Removes the error message associated with a specific form field.
   * @param fieldName - The name of the form field.
   */
  const removeError = (fieldName: string) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.fieldName !== fieldName)
    );
  };

  /**
   * Retrieves the error message associated with a specific form field.
   * @param fieldName - The name of the form field.
   * @returns The error message for the specified field, or an empty string if no error message is found.
   */
  const getErrorMessageByFildName = (fieldName: string) => {
    let findErrorMessage = errors.find(
      (error) => error.fieldName === fieldName
    )?.message;

    if (!findErrorMessage) {
      findErrorMessage = "";
    }

    return findErrorMessage;
  };

  return {
    setError,
    errors,
    removeError,
    getErrorMessageByFildName,
  };
};
