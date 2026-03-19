export function RadioGroup({ label, value, onChange, name, options, error, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-bg-light-primary-text dark:text-bg-dark-primary-text">
          {label}
        </label>
      )}

      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="w-4 h-4 text-btn bg-bg-light-component dark:bg-bg-dark-component border-gray-200 dark:border-gray-600 focus:ring-btn focus:ring-2"
            />
            <span className="ml-2 text-sm text-bg-light-primary-text dark:text-bg-dark-primary-text">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}