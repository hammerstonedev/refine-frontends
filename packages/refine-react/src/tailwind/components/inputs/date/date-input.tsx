import { RefineFlavor } from "../../../../components/refine-flavor";
import { useInput } from "../use-input";

export const DateInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <label className="sr-only">{display}</label>
      <RefineFlavor<"inputs.date">
        name="inputs.date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
