export default function Button({ children, className='', ...props }) {
  return (
    <button
      className={`rounded-xl bg-brand-600 px-4 py-2 font-medium text-indigo-500 hover:bg-brand-700 disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
