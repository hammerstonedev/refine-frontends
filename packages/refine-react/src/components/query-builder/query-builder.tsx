import React, { useMemo, useReducer } from "react";
import type {
  Blueprint,
  Condition,
  PartialReactRefineFlavor,
  ReactRefineFlavor,
} from "refine-core/types";
import { BlueprintStore } from "refine-core";
import { CriterionGroup, FlavorItem, QueryBuilderProvider } from "components";
import { extendFlavor } from "utils";
import baseFlavor from "flavors/base";

export type QueryBuilderProps = {
  blueprint: Blueprint;
  conditions: Condition[];
  flavor?: PartialReactRefineFlavor;
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
  flavor: partialFlavor = {},
}: QueryBuilderProps) => {
  const rerender = useRerender();
  const { blueprint, flavor } = useMemo(() => {
    const blueprint = new BlueprintStore(
      initialBlueprint,
      conditions,
      (blueprint) => {
        onChange?.(blueprint);
        rerender();
      }
    );

    const flavor = extendFlavor(baseFlavor, partialFlavor) as ReactRefineFlavor;

    return { blueprint, flavor };
  }, []);

  return (
    <QueryBuilderProvider
      value={{
        blueprint: blueprint,
        groupedBlueprint: blueprint.groupedBlueprint(),
        conditions,
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
