import {toast} from "react-hot-toast";

export const customColorToast = (
  message: string,
  color: string,
  type: "success" | "error"
) => {
  if (type === "success") {
    return toast.success(message, {
      style: {
        border: `1px solid ${color}`,
        padding: "16px",
        color: color,
      },
      iconTheme: {
        primary: color,
        secondary: "#FFFAEE",
      },
    });
  }

  if (type === "error") {
    return toast.error(message, {
      style: {
        border: `1px solid ${color}`,
        padding: "16px",
        color: color,
      },
      iconTheme: {
        primary: color,
        secondary: "#FFFAEE",
      },
    });
  }
};
