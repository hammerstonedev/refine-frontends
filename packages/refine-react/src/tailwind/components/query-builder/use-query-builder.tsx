import { createContext, useContext } from "react";
import { Condition, GroupedBlueprint } from "refine-types";

export type QueryBuilderContext = {
  groupedBlueprint: GroupedBlueprint;
  updateGroupedBlueprint: {
    (payload: GroupedBlueprint): void;
    (updateFn: (criterion: GroupedBlueprint) => GroupedBlueprint): void;
  };
  conditions: Condition[];
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
