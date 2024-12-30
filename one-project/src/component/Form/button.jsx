const CustomButton = ({ label, onClick, disabled, customStyles = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-4 focus:ring-blue-300"
      } ${customStyles}`}
    >
      {label}
    </button>
  );
};
export default CustomButton