import merge from "deepmerge";
import { PartialReactRefineFlavor } from "refine-core/types";

export const extendFlavor = (
  firstFlavor: PartialReactRefineFlavor,
  secondFlavor: PartialReactRefineFlavor
): PartialReactRefineFlavor => {
  return merge(firstFlavor, secondFlavor);
};
