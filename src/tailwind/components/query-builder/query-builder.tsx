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

  return (
    <>
      <QueryBuilderProvider
        value={{
          groupedBlueprint,
          updateGroupedBlueprint: setGroupedBlueprint,
          conditions,
        }}
      >
        <div className="font-sans">
          <div className="">
            {groupedBlueprint.map((criteria, index) => (
              <CriterionGroup key={index} criteria={criteria} index={index} />
            ))}
          </div>
        </div>
      </QueryBuilderProvider>
      <pre className="text-xs">{JSON.stringify(groupedBlueprint, null, 2)}</pre>
    </>
  );
};
