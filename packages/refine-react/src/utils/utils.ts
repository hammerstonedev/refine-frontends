import merge from "deepmerge";
import type { PartialReactRefineFlavor } from "refine-core/types";

export const extendFlavor = (
  firstFlavor: PartialReactRefineFlavor,
  secondFlavor: PartialReactRefineFlavor
): PartialReactRefineFlavor => {
  return merge(firstFlavor, secondFlavor);
};

export const valueToArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") return [value];

  return [];
};
