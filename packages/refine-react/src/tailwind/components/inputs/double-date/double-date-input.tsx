import { useInput } from "../use-input";
import { Label } from "../../../../components/label";
import { RefineFlavor } from "../../../../components/refine-flavor";

export const DoubleDateInput = () => {
  // TODO: use separate value for each input
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <RefineFlavor<"inputs.date.double.wrapper"> name="inputs.date.double.wrapper">
        <RefineFlavor<"inputs.date.double">
          name="inputs.date.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <RefineFlavor<"inputs.date.double.joiner"> name="inputs.date.double.joiner">
          and
        </RefineFlavor>
        <RefineFlavor<"inputs.date.double">
          name="inputs.date.double"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </RefineFlavor>
    </div>
  );
};
