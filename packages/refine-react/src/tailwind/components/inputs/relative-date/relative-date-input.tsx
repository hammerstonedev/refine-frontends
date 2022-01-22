import { useInput } from "../use-input";

export const RelativeDateInput = () => {
  const { display, value, onChange } = useInput<string>();

  const units: string[] = [];
  const modifiers: string[] = [];

  return (
    <div>
      <label className="sr-only">{display}</label>
      <input
        type="number"
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <select>
        {units.map((unit) => (
          <option></option>
        ))}
      </select>
      <select>
        {modifiers.map((modifier) => (
          <option></option>
        ))}
      </select>
    </div>
  );
};
