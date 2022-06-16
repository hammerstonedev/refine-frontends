interface BaseCriterionInput {
  clause: string;
}

export interface BasicCriterionInput extends BaseCriterionInput {
  value?: string | string[];
}

export interface DoubleNumberInput extends BaseCriterionInput {
  value1?: string;
  value2?: string;
}

export interface DoubleDateInput extends BaseCriterionInput {
  date1?: string;
  date2?: string;
}

export interface RelativeDateCriterionInput extends BaseCriterionInput {
  amount: string;
  unit: string;
  modifier: string;
}

export type CriterionInput =
  | BasicCriterionInput
  | DoubleNumberInput
  | DoubleDateInput
  | RelativeDateCriterionInput;

interface BaseBlueprintItem {
  depth: number;
  type: string;
}

export interface Criterion extends BaseBlueprintItem {
  type: "criterion";
  condition_id: string;
  input: CriterionInput;
}

export interface Conjunction extends BaseBlueprintItem {
  type: "conjunction";
  word: "and" | "or";
}

export type BlueprintItem = Criterion | Conjunction;

export type Blueprint = BlueprintItem[];

export const isCriterion = (value: unknown): value is Criterion =>
  (value as any)?.type === "criterion";

export const isConjunction = (value: unknown): value is Conjunction =>
  (value as any)?.type === "conjunction";
