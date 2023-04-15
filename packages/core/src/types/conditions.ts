export type Condition = {
  id: string;
  component: string;
  display: string;
  meta: {
    clauses: Clause[];
    options?: Option[];
  };
  refinements: Refinement[];
};

export type Clause = {
  id: string;
  component?: string;
  display: string;
  meta: {
    multiple?: boolean;
    units?: Array<{ id: string; display: string }>;
    modifiers?: Array<{ id: string; display: string }>;
  };
};

export type Option = {
  id: string | number;
  display: string;
};

export type Refinement = {
  id: string;
  display: string;
  meta?: {
    clauses: Clause[];
  };
  refinements: Refinement[];
};
