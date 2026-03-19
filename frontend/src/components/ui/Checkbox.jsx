export function Checkbox({ label, checked, onChange, name, error, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-btn bg-bg-light-component dark:bg-bg-dark-component border-gray-200 dark:border-gray-600 rounded focus:ring-btn focus:ring-2"
        />
        <span className="ml-2 text-sm text-bg-light-primary-text dark:text-bg-dark-primary-text">
          {label}
        </span>
      </label>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}