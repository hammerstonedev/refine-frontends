import { createContext, useContext } from "react";
import { Criterion, GroupedBlueprint } from "refine-core/types";

export type CriterionContext = GroupedBlueprint[number][number] & {
  update: (
    payloadOrUpdateFn: Criterion | ((payload: Criterion) => Criterion)
  ) => void;
  remove: () => void;
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
