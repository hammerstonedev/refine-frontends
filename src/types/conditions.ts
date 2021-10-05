import { ConditionComponentName } from "../tailwind/components/conditions";
import { InputComponentName } from "../tailwind/components/inputs";

export type Condition = {
  id: string;
  component: ConditionComponentName;
  display: string;
  meta: {
    clauses: Clause[];
    options?: Option[];
  };
  refinements: Refinement[];
};

export type Clause = {
  id: string;
  component?: InputComponentName;
  display: string;
  meta: [];
};
export type Option = {
  id: string;
  display: string;
};
export type Refinement = {};

export type Conditions = Condition[];
