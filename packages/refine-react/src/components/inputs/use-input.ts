import { createContext, useContext } from "react";
import type { CriterionInput, Option } from "refine-core/types";

/**
 * If `Value` is an object it will be added to `InputContext` instead of
 * adding a `value` property. Otherwise `value` will be set to `Value`.
 */
export type InputContext<
  Value = string,
  _ValueProps = Value extends object ? Value : { value: Value }
> = {
  display: string;
  onChange: (input: Partial<CriterionInput>) => void;
  options?: Option[];
  multiple?: boolean;
} & _ValueProps;

export const InputContext = createContext<InputContext | null>(null);

export const InputProvider = InputContext.Provider;

export const useInput = <Value>() => {
  const input = useContext(InputContext) as InputContext<Value> | null;

  if (!input) {
    throw new Error(`useInput can only be used within a InputProvider.`);
  }

  return input;
};
