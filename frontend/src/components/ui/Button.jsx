export function Button({
  children,
  text,
  type = "submit",
  disabled,
  onClick,
  variant = "default",
  className = "",
  ...props
}) {
  let baseStyle = "flex justify-center items-center transition-all focus:outline-none ";
  
  if (variant === "primary") {
    baseStyle += "px-5 py-2.5 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md ";
  } else if (variant === "ghost") {
    baseStyle += "px-5 py-2.5 rounded-xl font-medium bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ";
  } else {
    // Fallback exactly to the old login-style fallback explicitly
    baseStyle += "w-full my-6 rounded-md bg-black px-3 py-4 text-white hover:bg-gray-800 font-normal ";
  }
  
  if (disabled) {
    baseStyle += "opacity-50 cursor-not-allowed ";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {text || children}
    </button>
  );
}
