export function Button({
  text,
  type = "submit",
  disabled,
  // onClick,
  // variant = "primary",
  // loading = false,
  // className = "",
}) {
  return (
    <div className="my-6">
      <button
        type={type}
        className={`w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none
          ${
          disabled ? "bg-gray-400 cursor-progress " : "bg-black cursor-pointer"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
