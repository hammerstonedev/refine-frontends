import { useMemo } from "react";
import type { Condition } from "../../../types";

export const useSelectedClause = (condition: Condition, clauseName: string) => {
  const selectedClause = useMemo(
    () => condition.meta.clauses.find((clause) => clause.id === clauseName),
    [condition, clauseName]
  );

  if (!selectedClause) {
    throw new Error(
      `Invalid clause ${clauseName} for condition ${condition.id}.`
    );
  }

  return selectedClause;
};
