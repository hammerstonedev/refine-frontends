/**
 * The `BlueprintStore` modifies the some types as below:
 */

import { Conjunction, Criterion } from "../blueprint";

export type InternalCriterion = Criterion & {
  id: Criterion["condition_id"];
  uid: string;
};

export type InternalCriterionWithPosition = InternalCriterion & {
  position: number;
};

export type InternalConjunction = Conjunction & {
  id: undefined;
  uid: number;
};

export type InternalBlueprint = Array<InternalCriterion | InternalConjunction>;

export type GroupedBlueprint = InternalCriterionWithPosition[][];
