import { createContext, useContext } from "react";
import { BlueprintStore } from "refine-core";
import type {
  Condition,
  ReactRefineFlavor,
  RefineErrors,
} from "refine-core/types";
import type { GroupedBlueprint } from "refine-core/types/internal";

export type QueryBuilderContext = {
  blueprint: BlueprintStore;
  groupedBlueprint: GroupedBlueprint;
  conditions: Condition[];
  errors: RefineErrors;
  flavor: ReactRefineFlavor;
};

export const QueryBuilderContext = createContext<QueryBuilderContext | null>(
  null
);

export const QueryBuilderProvider = QueryBuilderContext.Provider;

export const useQueryBuilder = () => {
  const context = useContext(QueryBuilderContext);

  if (!context) {
    throw new Error(
      `useQueryBuilder can only be used within a QueryBuilderProvider`
    );
  }

  return context;
};
