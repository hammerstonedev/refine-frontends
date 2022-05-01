import { FlavorItem, Label, useInput } from "components";

export const DoubleDateInput = () => {
  const { display, date1, date2, onChange } =
    useInput<{ date1: string; date2: string }>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<"inputs.date.double.wrapper"> name="inputs.date.double.wrapper">
        <FlavorItem<"inputs.date.double">
          name="inputs.date.double"
          value={date1}
          onChange={(event) => onChange({ date1: event.target.value })}
        />
        <FlavorItem<"inputs.date.double.joiner"> name="inputs.date.double.joiner">
          and
        </FlavorItem>
        <FlavorItem<"inputs.date.double">
          name="inputs.date.double"
          value={date2}
          onChange={(event) => onChange({ date2: event.target.value })}
        />
      </FlavorItem>
    </div>
  );
};
