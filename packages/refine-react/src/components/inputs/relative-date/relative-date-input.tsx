import { FlavorItem, Label, useInput } from "components";

export const RelativeDateInput = () => {
  // TODO: actually implement this
  const { display, value, onChange } = useInput<string>();

  const units: string[] = [];
  const modifiers: string[] = [];

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<"inputs.date.relative.wrapper"> name="inputs.date.relative.wrapper">
        <FlavorItem<"inputs.date.relative">
          name="inputs.date.relative"
          value={value}
          onChange={(event) => onChange({ value: event.target.value })}
        />
        <FlavorItem<"select"> name="select" value="" onChange={() => {}}>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </FlavorItem>
        <FlavorItem<"select"> name="select" value="" onChange={() => {}}>
          {modifiers.map((modifier) => (
            <option key={modifier} value={modifier}>
              {modifier}
            </option>
          ))}
        </FlavorItem>
      </FlavorItem>
    </div>
  );
};
