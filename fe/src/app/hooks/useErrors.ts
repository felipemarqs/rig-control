import {useState} from "react";

export type ErrorArgs = {fieldName: string; message: string};

export const useErrors = () => {
  const [errors, setErrors] = useState<Array<ErrorArgs>>([]);

  const setError = ({fieldName, message}: ErrorArgs) => {
    const errorAlreadyExists = errors.find(
      (error) => error.fieldName === fieldName
    );

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, {fieldName, message}]);
  };

  const removeError = (fieldName: string) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.fieldName !== fieldName)
    );
  };

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
