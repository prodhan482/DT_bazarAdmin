function DescriptionField({ value, onChange, label, required = true }) {
  return (
    <div className="mb-4">
      <label htmlFor="description" className="block text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        id="description"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y rounded-md"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add description"
      />
    </div>
  );
}

export default DescriptionField;
