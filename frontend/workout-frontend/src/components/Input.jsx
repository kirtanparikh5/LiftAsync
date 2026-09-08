export default function Input({ label, error, className='', ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm text-gray-700 dark:text-gray-300">{label}</div>}
      <input
        className={`w-full rounded-xl border px-3 py-2 outline-none placeholder:text-gray-400
        focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}
