import { createContext, useContext } from "react";
import { Option } from "refine-types";

export type InputContext<Value = any> = {
  display: string;
  value: Value;
  onChange: (value: Value) => void;
  options?: Option[];
  multiple?: boolean;
};

export const InputContext = createContext<InputContext | null>(null);

export const InputProvider = InputContext.Provider;

export const useInput = <Value>() => {
  const input = useContext(InputContext) as InputContext<Value> | null;

  if (!input) {
    throw new Error(`useInput can only be used within a InputProvider.`);
  }

  return input;
};

export const valueToArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") return [value];

  return [];
};
