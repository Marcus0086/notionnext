import { useMemo } from "react";

import CleanCSS from "clean-css";

const useCleanCss = () => {
  const cleanCss = useMemo(
    () => (css: string) => {
      const cleancssInstance = new CleanCSS({
        level: 2,
        inline: false,
        rebase: false,
      }).minify(css);
      return cleancssInstance.styles;
    },
    [],
  );
  return cleanCss;
};

export default useCleanCss;
