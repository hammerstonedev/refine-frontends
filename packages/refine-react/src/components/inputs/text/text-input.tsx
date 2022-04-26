import { FlavorItem, Label, useInput } from "components";

export const TextInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<"inputs.text">
        name="inputs.text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
