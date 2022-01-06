import { useState } from "react";
import { Blueprint, Conditions, GroupedBlueprint } from "../../../types";
import { CriterionGroup } from "../criterion-group";
import { QueryBuilderProvider } from "./use-query-builder";

export type QueryBuilderProps = {
  blueprint: Blueprint;
  conditions: Conditions;
  onChange?: (blueprint: GroupedBlueprint) => void;
};

export const groupBlueprintItems = (blueprint: Blueprint): GroupedBlueprint => {
  const groupedBlueprint: GroupedBlueprint = [];
  let currentGroupIndex = 0;

  for (const item of blueprint) {
    if (item.type === "conjunction") {
      if (item.word === "or") {
        currentGroupIndex++;
      }
    }

    if (item.type === "criterion") {
      if (!Array.isArray(groupedBlueprint[currentGroupIndex])) {
        groupedBlueprint.push([]);
      }

      groupedBlueprint[currentGroupIndex].push(item);
    }
  }

  return groupedBlueprint;
};

export const QueryBuilder = ({
  blueprint: initialBlueprint,
  conditions,
  onChange,
}: QueryBuilderProps) => {
  const [groupedBlueprint, setGroupedBlueprint] = useState(() =>
    groupBlueprintItems(initialBlueprint)
  );

  const updateGroupedBlueprint: typeof setGroupedBlueprint = (
    groupedBlueprintOrUpdateFn
  ) => {
    setGroupedBlueprint((groupedBlueprint) => {
      const updatedGroupedBlueprint =
        typeof groupedBlueprintOrUpdateFn === "function"
          ? groupedBlueprintOrUpdateFn(groupedBlueprint)
          : groupedBlueprintOrUpdateFn;

      if (onChange) {
        onChange(updatedGroupedBlueprint);
      }

      return updatedGroupedBlueprint;
    });
  };

  const addGroup = () =>
    updateGroupedBlueprint((groupedBlueprint) => [
      ...groupedBlueprint,
      [
        {
          type: "criterion",
          depth: 1,
          condition_id: "option",
          input: { clause: "eq" },
        },
      ],
    ]);

  return (
    <QueryBuilderProvider
      value={{
        groupedBlueprint,
        updateGroupedBlueprint,
        conditions,
      }}
    >
      <div data-testid="refine-query-builder">
        {groupedBlueprint.map((criteria, index) => (
          <CriterionGroup key={index} criteria={criteria} index={index} />
        ))}
        <button
          type="button"
          onClick={addGroup}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add an 'Or'
        </button>
      </div>
    </QueryBuilderProvider>
  );
};
