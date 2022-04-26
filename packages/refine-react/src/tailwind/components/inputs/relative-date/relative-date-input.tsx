import { Label } from "../../../../components/label";
import { RefineFlavor } from "../../../../components/refine-flavor";
import { useInput } from "../use-input";

export const RelativeDateInput = () => {
  // TODO: actually implement this
  const { display, value, onChange } = useInput<string>();

  const units: string[] = [];
  const modifiers: string[] = [];

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <RefineFlavor<"inputs.date.relative.wrapper"> name="inputs.date.relative.wrapper">
        <RefineFlavor<"inputs.date.relative">
          name="inputs.date.relative"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <RefineFlavor<"select"> name="select" value="" onChange={() => {}}>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </RefineFlavor>
        <RefineFlavor<"select"> name="select" value="" onChange={() => {}}>
          {modifiers.map((modifier) => (
            <option key={modifier} value={modifier}>
              {modifier}
            </option>
          ))}
        </RefineFlavor>
      </RefineFlavor>
    </div>
  );
};
