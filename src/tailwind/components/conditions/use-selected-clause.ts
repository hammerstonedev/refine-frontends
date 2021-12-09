import { useMemo } from "react";
import type { Condition } from "../../../types";

export const useSelectedClause = (condition: Condition, clauseName: string) =>
  useMemo(
    () => condition.meta.clauses.find((clause) => clause.id === clauseName),
    [condition, clauseName]
  );
