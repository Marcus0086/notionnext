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
    <Icon className="w-6 h-6 group-hover:!fill-slate-800" aria-label={label} />
  );
};

export default OutlinedIcon;
