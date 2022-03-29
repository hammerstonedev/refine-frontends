import type { Condition, Criterion } from "refine-core/types";

export type ConditionComponentName =
  | "BooleanCondition"
  | "DateCondition"
  | "DateCondition"
  | "DateCondition"
  | "NumericCondition"
  | "OptionCondition"
  | "TextCondition";

export interface BaseConditionProps {
  criterion: Criterion;
  condition: Condition;
}
