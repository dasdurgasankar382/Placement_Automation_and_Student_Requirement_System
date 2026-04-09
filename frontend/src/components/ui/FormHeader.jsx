export function FormHeader({headerText, pText}){
    return (
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{headerText}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{pText}</p>
        </div>
    );
}