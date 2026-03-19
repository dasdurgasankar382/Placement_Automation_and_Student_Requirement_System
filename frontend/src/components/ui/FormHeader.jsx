export function LoginHeader({headerText, pText}){
    return (
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">{headerText}</h1>
          <p className="mt-2 text-gray-500">{pText}</p>
        </div>
    );
}