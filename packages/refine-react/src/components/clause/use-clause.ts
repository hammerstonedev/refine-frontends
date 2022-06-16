import { createContext, useContext } from "react";
import type { Clause } from "refine-core/types";

export type ClauseContext = Clause;

export const ClauseContext = createContext<ClauseContext | null>(null);
export const ClauseProvider = ClauseContext.Provider;

export const useClause = () => {
  const clause = useContext(ClauseContext);

  if (!clause) {
    throw new Error(`useClause can only be used within a ClauseProvider.`);
  }

  return clause;
};
