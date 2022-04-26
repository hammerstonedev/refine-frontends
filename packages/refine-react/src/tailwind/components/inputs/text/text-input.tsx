import { Label } from "../../../../components/label";
import { RefineFlavor } from "../../../../components/refine-flavor";
import { useInput } from "../use-input";

export const TextInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <RefineFlavor<"inputs.text">
        name="inputs.text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
