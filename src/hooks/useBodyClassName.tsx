import { useEffect } from "react";

const useBodyClassName = (className: string) => {
  useEffect(() => {
    if (document) {
      document.body.classList.add(className);
    }
    return () => {
      if (document) {
        document.body.classList.remove(className);
      }
    };
  }, [className]);
};

export default useBodyClassName;
