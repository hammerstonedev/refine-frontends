import { DateInput } from "./date";
import { DoubleDateInput } from "./double-date";
import { NumberInput } from "./number";
import { DoubleNumberInput } from "./double-number";
import { OptionInput } from "./option";
import { RelativeDateInput } from "./relative-date";
import { TextInput } from "./text";

export const inputComponents = {
  DateInput,
  DoubleDateInput,
  DoubleNumberInput,
  NumberInput,
  OptionInput,
  RelativeDateInput,
  TextInput,
};

export type InputComponentName = keyof typeof inputComponents;

export * from "./date";
export * from "./double-date";
export * from "./number";
export * from "./double-number";
export * from "./option";
export * from "./relative-date";
export * from "./text";
export * from "./use-input";
