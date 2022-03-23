import { DateInput } from "./date";
import { DoubleDateInput } from "./double-date";
import { NumberInput } from "./number";
import { DoubleNumberInput } from "./double-number";
import { OptionInput } from "./option";
import { RelativeDateInput } from "./relative-date";
import { TextInput } from "./text";

const inputComponents = {
  DateInput,
  DoubleDateInput,
  DoubleNumberInput,
  NumberInput,
  OptionInput,
  RelativeDateInput,
  TextInput,
};

export type InputComponentName = keyof typeof inputComponents;

export default inputComponents;
