import { createContext, useContext } from "react";
import { Conditions, GroupedBlueprint } from "../../../types";

export type QueryBuilderContext = {
  groupedBlueprint: GroupedBlueprint;
  updateGroupedBlueprint: {
    (payload: GroupedBlueprint): void;
    (updateFn: (criterion: GroupedBlueprint) => GroupedBlueprint): void;
  };
  conditions: Conditions;
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
