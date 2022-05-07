import { FlavorItem, Label, useInput } from "components";
import { removeDuplicates, valueToArray } from "utils";

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
      <FlavorItem<"select.wrapper"> name="select.wrapper">
        <FlavorItem<"select">
          name="select"
          value={multiple ? valueToArray(value) : value}
          onChange={(event) => {
            if (!multiple) return onChange({ value: event.target.value });

            /**
             * If multiple, onChange provides the value that was toggled so
             * we need to add or remove it as needed.
             */

            /**
             * Coerce to array to keep TypeScript happy.
             */
            const valueArray = valueToArray(value);

            if (valueArray.includes(event.target.value)) {
              return onChange({
                value: valueArray.filter(
                  (value) => value !== event.target.value
                ),
              });
            }

            return onChange({
              value: removeDuplicates([...valueArray, event.target.value]),
            });
          }}
          multiple={multiple}
        >
          <FlavorItem<"select.button"> name="select.button">
            {valueToArray(value)
              .map(
                (value) =>
                  options.find((option) => option.id === value)?.display
              )
              .filter(Boolean)
              .join(", ")}
          </FlavorItem>
          <FlavorItem<"select.listbox"> name="select.listbox">
            {options.map((option) => (
              <FlavorItem<"select.listbox.item">
                key={option.id}
                name="select.listbox.item"
                value={option.id}
              >
                {option.display}
              </FlavorItem>
            ))}
          </FlavorItem>
        </FlavorItem>
      </FlavorItem>
    </div>
  );
};
