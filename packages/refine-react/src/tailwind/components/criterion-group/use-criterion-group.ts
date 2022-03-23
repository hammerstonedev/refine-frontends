import { createContext, useContext } from "react";
import { CriterionBlueprintItem } from "refine-core/types";

export type CriterionGroupContext = {
  index: number;
  criteria: CriterionBlueprintItem[];
  modify: {
    (payload: CriterionBlueprintItem[] | null): void;
    (
      updateFn: (
        criteria: CriterionBlueprintItem[]
      ) => CriterionBlueprintItem[] | null
    ): void;
  };
  addCriterion: (payload: CriterionBlueprintItem) => void;
  updateCriterion: {
    (index: number, payload: CriterionBlueprintItem): void;
    (
      index: number,
      updateFn: (criterion: CriterionBlueprintItem) => CriterionBlueprintItem
    ): void;
  };
  removeCriterion: (index: number) => void;
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
