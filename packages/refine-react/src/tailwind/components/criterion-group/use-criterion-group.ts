import { createContext, useContext } from "react";
import type { InternalCriterionWithPosition } from "refine-core/types/internal";

export type CriterionGroupContext = {
  index: number;
  criteria: InternalCriterionWithPosition[];
};

export const CriterionGroupContext =
  createContext<CriterionGroupContext | null>(null);
export const CriterionGroupProvider = CriterionGroupContext.Provider;

export const useCriterionGroup = () => {
  const criterionGroup = useContext(CriterionGroupContext);

  if (!criterionGroup) {
    throw new Error(
      `useCriterionGroup can only be used within a CriterionGroupProvider.`
    );
  }

  return criterionGroup;
};
