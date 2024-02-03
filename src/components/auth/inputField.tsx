const InputField = ({
  label,
  htmlFor,
  type,
  id,
}: {
  label: string;
  htmlFor: string;
  type: string;
  id: string;
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="text-cloudBurst dark:text-white text-xs mt-6"
      >
        {label}
      </label>
      <input
        type={type}
        name={htmlFor}
        id={id}
        required
        autoFocus
        autoComplete={type}
        className="w-full bg-white dark:bg-navy-900 rounded-xl border-gray-200 border border-solid outline-rockBlue px-4 py-3 mt-2"
      />
    </>
  );
};

export default InputField;
