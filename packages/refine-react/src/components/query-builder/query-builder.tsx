import React, { useMemo, useReducer, useCallback, useRef } from "react";
import type {
  Blueprint,
  Condition,
  PartialReactRefineFlavor,
  ReactRefineFlavor,
  RefineErrors,
} from "refine-core/types";
import { BlueprintStore } from "refine-core";
import { CriterionGroup, FlavorItem, QueryBuilderProvider } from "components";
import { extendFlavor } from "utils";
import baseFlavor from "flavors/base";

export type QueryBuilderProps = {
  blueprint: Blueprint;
  conditions: Condition[];
  errors?: RefineErrors;
  flavor?: PartialReactRefineFlavor;
  onChange?: (blueprint: Blueprint) => void;
};

const useRerender = () => {
  const [, rerender] = useReducer((x) => x + 1, 0);

  return rerender;
};

/**
 * Wraps a callback such that it won't be called on the first render.
 */
const useDeferredCallback = (
  onChange: QueryBuilderProps['onChange']
): NonNullable<QueryBuilderProps['onChange']> => {
  const isFirstRenderRef = useRef<boolean>(true);

  // `useCallback` so that the function will have a stable identify across renders.
  return useCallback((blueprint: Blueprint) => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    onChange?.(blueprint);
  }, []);
};

export const QueryBuilder = ({
  blueprint: initialBlueprint = [],
  conditions = [],
  errors = {},
  onChange,
  flavor: partialFlavor = {},
}: QueryBuilderProps) => {
  const rerender = useRerender();

  const deferredOnChange = useDeferredCallback(onChange);
  const { blueprint, flavor } = useMemo(() => {
    const blueprint = new BlueprintStore(initialBlueprint, conditions, (blueprint) => {
      deferredOnChange(blueprint);
      rerender();
    });

    const flavor = extendFlavor(baseFlavor, partialFlavor) as ReactRefineFlavor;

    return { blueprint, flavor };
  }, []);

  return (
    <QueryBuilderProvider
      value={{
        blueprint: blueprint,
        groupedBlueprint: blueprint.groupedBlueprint(),
        conditions,
        errors,
        flavor,
      }}
    >
      <div data-testid="refine-query-builder">
        {blueprint.groupedBlueprint().map((criteria, index) => (
          <CriterionGroup key={index} criteria={criteria} index={index} />
        ))}
        <FlavorItem<"addGroupButton">
          name="addGroupButton"
          data-testid="refine-add-criterion-group"
          onClick={() => blueprint.addGroup()}
        >
          Add an 'Or'
        </FlavorItem>
      </div>
    </QueryBuilderProvider>
  );
};
