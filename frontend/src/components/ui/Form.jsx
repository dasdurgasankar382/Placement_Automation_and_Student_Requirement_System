export function Form({ onSubmit, children, className = "" }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-bg-light dark:bg-bg-dark px-4">
      <div className={`w-full max-w-md bg-bg-light-component dark:bg-bg-dark-component p-8 rounded-2xl shadow-xl ${className}`}>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}
        </form>
      </div>
    </div>
  );
}