export function FormFooter({ text, linkText, linkPath }) {

  return (
    <p className="text-center text-sm text-gray-500 mt-4">
      {text}{" "}
      <a
        href={linkPath}
        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
      >
        {linkText}
      </a>
      .
    </p>
  );
}
