import { FlavorItem, Label, useInput } from "components";

export const DoubleDateInput = () => {
  // TODO: use separate value for each input
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<"inputs.date.double.wrapper"> name="inputs.date.double.wrapper">
        <FlavorItem<"inputs.date.double">
          name="inputs.date.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <FlavorItem<"inputs.date.double.joiner"> name="inputs.date.double.joiner">
          and
        </FlavorItem>
        <FlavorItem<"inputs.date.double">
          name="inputs.date.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </FlavorItem>
    </div>
  );
};
