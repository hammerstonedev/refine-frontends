import { createContext, useContext } from "react";
import { Criterion, InternalCriterionWithPosition } from "refine-core/types";

export type CriterionContext = InternalCriterionWithPosition & {
  updateCondition: (conditionId: Criterion["condition_id"]) => void;
  updateInput: (input: Partial<Criterion["input"]>) => void;
};

export const CriterionContext = createContext<CriterionContext | null>(null);
export const CriterionProvider = CriterionContext.Provider;

export const useCriterion = () => {
  const criterion = useContext(CriterionContext);

  if (!criterion) {
    throw new Error(
      `useCriterion can only be used within a CriterionProvider.`
    );
  }

  return criterion;
};
