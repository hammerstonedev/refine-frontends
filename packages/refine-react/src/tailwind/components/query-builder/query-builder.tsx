import React, { useMemo, useReducer } from "react";
import type {
  Blueprint,
  Condition,
  PartialReactRefineFlavor,
} from "refine-core/types";
import { BlueprintStore } from "refine-core";
import { CriterionGroup } from "../criterion-group";
import { QueryBuilderProvider } from "./use-query-builder";
import { RefineFlavor } from "../../../components/refine-flavor";
import baseFlavor from "../../../flavors/base";
import { extendFlavor } from "../../..";

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

    const flavor = extendFlavor(baseFlavor, partialFlavor);

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
        <RefineFlavor<"addGroupButton">
          name="addGroupButton"
          data-testid="refine-add-criterion-group"
          onClick={() => blueprint.addGroup()}
        >
          Add an 'Or'
        </RefineFlavor>
      </div>
    </QueryBuilderProvider>
  );
};
