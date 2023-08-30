import {AxiosError} from "axios";
import {customColorToast} from "./customColorToast";

export const treatAxiosError = (error: Error | typeof AxiosError) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      customColorToast(error.response.data.message, "#fc5050", "error");
    } else {
      customColorToast("Ocorreu um erro!", "#fc5050", "error");
    }

    return;
  }
};
