const CustomInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  options = [],
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg border ${
            error ? "border-red-300" : "border-gray-300"
          } px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-150"
          />
          <span className="ml-3 text-sm text-gray-600">{placeholder}</span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg border ${
            error ? "border-red-300" : "border-gray-300"
          } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};
export default CustomInput