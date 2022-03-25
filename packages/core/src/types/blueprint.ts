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

export type GroupedBlueprint = (Criterion & { position: number })[][];

export const isCriterion = (value: unknown): value is Criterion =>
  (value as any)?.type === "criterion";

export const isConjunction = (value: unknown): value is Conjunction =>
  (value as any)?.type === "conjunction";

/**
 * The `BlueprintStore` modifies the some types as below:
 */

export type InternalCriterion = Criterion & {
  id: Criterion["condition_id"];
  uid: number;
};

export type InternalCriterionWithPosition = InternalCriterion & {
  position: number;
};

export type InternalConjunction = Conjunction & {
  id: undefined;
  uid: number;
};

export type InternalBlueprint = Array<InternalCriterion | InternalConjunction>;
