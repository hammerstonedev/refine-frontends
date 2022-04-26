import { Label } from "../../../../components/label";
import { RefineFlavor } from "../../../../components/refine-flavor";
import { useInput } from "../use-input";

export const DateInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <RefineFlavor<"inputs.date">
        name="inputs.date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
