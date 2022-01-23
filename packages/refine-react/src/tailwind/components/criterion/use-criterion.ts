import { createContext, useContext } from "react";
import { CriterionBlueprintItem } from "refine-types";

export type CriterionContext = CriterionBlueprintItem & {
  update: (
    payloadOrUpdateFn:
      | CriterionBlueprintItem
      | ((payload: CriterionBlueprintItem) => CriterionBlueprintItem)
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
