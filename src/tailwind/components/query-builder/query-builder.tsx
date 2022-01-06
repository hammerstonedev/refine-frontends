import { useState } from "react";
import { Blueprint, Conditions, GroupedBlueprint } from "../../../types";
import { CriterionGroup } from "../criterion-group";
import { QueryBuilderProvider } from "./use-query-builder";

export type QueryBuilderProps = {
  blueprint: Blueprint;
  conditions: Conditions;
};

const groupBlueprintItems = (blueprint: Blueprint): GroupedBlueprint => {
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
}: QueryBuilderProps) => {
  const [groupedBlueprint, setGroupedBlueprint] = useState(() =>
    groupBlueprintItems(initialBlueprint)
  );

  const addGroup = () =>
    setGroupedBlueprint((groupedBlueprint) => [
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
    <>
      <QueryBuilderProvider
        value={{
          groupedBlueprint,
          updateGroupedBlueprint: setGroupedBlueprint,
          conditions,
        }}
      >
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
      </QueryBuilderProvider>
      <pre className="text-xs">{JSON.stringify(groupedBlueprint, null, 2)}</pre>
    </>
  );
};
