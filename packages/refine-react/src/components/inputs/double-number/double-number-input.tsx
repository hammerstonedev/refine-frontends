import { FlavorItem, Label, useInput } from "components";

export const DoubleNumberInput = () => {
  // TODO: use separate value for each input
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<"inputs.number.double.wrapper"> name="inputs.number.double.wrapper">
        <FlavorItem<"inputs.number.double">
          name="inputs.number.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <FlavorItem<"inputs.number.double.joiner"> name="inputs.number.double.joiner">
          and
        </FlavorItem>
        <FlavorItem<"inputs.number.double">
          name="inputs.number.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </FlavorItem>
    </div>
  );
};
