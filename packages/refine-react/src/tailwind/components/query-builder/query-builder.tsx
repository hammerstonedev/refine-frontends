import React, { useReducer, useState } from "react";
import { Blueprint, Condition } from "refine-core/types";
import { BlueprintStore } from "refine-core";
import { CriterionGroup } from "../criterion-group";
import { QueryBuilderProvider } from "./use-query-builder";

export type QueryBuilderProps = {
  blueprint: Blueprint;
  conditions: Condition[];
  onChange?: (blueprint: Blueprint) => void;
};

const useRerender = () => {
  const [, rerender] = useReducer(() => null, null);

  return rerender;
};

export const QueryBuilder = ({
  blueprint: initialBlueprint,
  conditions,
  onChange,
}: QueryBuilderProps) => {
  const rerender = useRerender();
  const [blueprint] = useState(
    () =>
      new BlueprintStore(initialBlueprint, conditions, (blueprint) => {
        onChange?.(blueprint);
        rerender();
      })
  );

  return (
    <QueryBuilderProvider
      value={{
        blueprint: blueprint,
        groupedBlueprint: blueprint.groupedBlueprint(),
        conditions,
      }}
    >
      <div data-testid="refine-query-builder">
        {blueprint.groupedBlueprint().map((criteria, index) => (
          <CriterionGroup key={index} criteria={criteria} index={index} />
        ))}
        <button
          data-testid="refine-add-criterion-group"
          type="button"
          onClick={() => blueprint.addGroup()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add an 'Or'
        </button>
      </div>
    </QueryBuilderProvider>
  );
};
