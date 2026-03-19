export function Textarea({ label, value, onChange, name, placeholder, required, error, rows = 4, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-bg-light-primary-text dark:text-bg-dark-primary-text">
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full bg-bg-light-component dark:bg-bg-dark-component text-bg-light-primary-text dark:text-bg-dark-primary-text text-sm rounded-lg px-3 py-2.5 border outline-none focus:ring-2 focus:ring-btn transition-all resize-vertical ${error ? "border-red-400" : "border-gray-200 dark:border-gray-600"}`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}