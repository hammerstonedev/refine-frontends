interface BaseCriterionInput {
  clause: string;
}

export interface BasicCriterionInput extends BaseCriterionInput {
  value?: string | string[];
}

export interface RelativeDateCriterionInput extends BaseCriterionInput {
  amount: number;
  unit: string;
  modifier: string;
}

export type CriterionInput = BasicCriterionInput | RelativeDateCriterionInput;

interface BaseBlueprintItem {
  depth: number;
  type: string;
}

export interface CriterionBlueprintItem extends BaseBlueprintItem {
  type: "criterion";
  condition_id: string;
  input: CriterionInput;
}

export interface ConjunctionBlueprintItem extends BaseBlueprintItem {
  type: "conjunction";
  word: "and" | "or";
}

export type BlueprintItem = CriterionBlueprintItem | ConjunctionBlueprintItem;

export type Blueprint = BlueprintItem[];

export type GroupedBlueprint = CriterionBlueprintItem[][];

export const isCriterionBlueprintItem = (
  value: unknown
): value is CriterionBlueprintItem => (value as any)?.type === "criterion";

export const isConjunctionBlueprintItem = (
  value: unknown
): value is ConjunctionBlueprintItem => (value as any)?.type === "conjunction";
