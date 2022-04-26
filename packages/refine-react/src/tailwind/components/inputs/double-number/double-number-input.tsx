import { Label } from "../../../../components/label";
import { RefineFlavor } from "../../../../components/refine-flavor";
import { useInput } from "../use-input";

export const DoubleNumberInput = () => {
  // TODO: use separate value for each input
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <RefineFlavor<"inputs.number.double.wrapper"> name="inputs.number.double.wrapper">
        <RefineFlavor<"inputs.number.double">
          name="inputs.number.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <RefineFlavor<"inputs.number.double.joiner"> name="inputs.number.double.joiner">
          and
        </RefineFlavor>
        <RefineFlavor<"inputs.number.double">
          name="inputs.number.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </RefineFlavor>
    </div>
  );
};
