import { useTheme } from "next-themes";
import { useMemo } from "react";
import { ToastOptions } from "react-toastify";

const useToast = () => {
  const { theme } = useTheme();
  const options = useMemo<ToastOptions>(
    () => ({
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === "dark" ? "dark" : "light",
    }),
    [theme],
  );
  Object.freeze(options);
  return options;
};

export default useToast;
