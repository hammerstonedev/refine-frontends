import { useInput } from "./use-input";

export const TextInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <label className="sr-only">{display}</label>
      <input
        type="text"
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
