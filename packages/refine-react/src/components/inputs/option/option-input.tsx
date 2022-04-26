import { FlavorItem, Label, useInput } from "components";
import { valueToArray } from "utils";

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
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<"select">
        name="select"
        value={multiple ? valueToArray(value) : value}
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
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.display}
          </option>
        ))}
      </FlavorItem>
    </div>
  );
};
