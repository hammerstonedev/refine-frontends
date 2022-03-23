import { useInput, valueToArray } from "../use-input";

export const OptionInput = () => {
  const {
    display,
    options,
    multiple = false,
    value,
    onChange,
  } = useInput<string | string[]>();

  if (!options) {
    throw new Error(`No options provided to OptionInput.`);
  }

  return (
    <div>
      <label className="sr-only">{display}</label>
      <select
        value={value}
        onChange={(event) => {
          if (!multiple) return onChange(event.target.value);

          /**
           * If multiple, onChange provides the value that was toggled so
           * we need to add or remove it as needed.
           */

          /**
           * Coerce to array to keep TypeScript happy.
           */
          const valueArray = valueToArray(value);

          if (valueArray.includes(event.target.value)) {
            return onChange(
              valueArray.filter((value) => value !== event.target.value)
            );
          }

          return onChange([...valueArray, event.target.value]);
        }}
        multiple={multiple}
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.display}
          </option>
        ))}
      </select>
    </div>
  );
};
