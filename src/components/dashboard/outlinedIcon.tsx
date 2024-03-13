import { IconType } from "react-icons";

const OutlinedIcon = ({
  iconProps,
  label,
}: {
  iconProps: IconType;
  label?: string;
}) => {
  const Icon = iconProps;
  return (
    <Icon
      className="w-7 h-7 group-hover:!fill-slate-800 dark:group-hover:!fill-white"
      aria-label={label}
    />
  );
};

export default OutlinedIcon;
