import { useState } from "react";
import type { Blueprint, Conditions, GroupedBlueprint } from "../../../types";
import { Condition } from "../conditions";

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

export const QueryBuilder = ({ blueprint, conditions }: QueryBuilderProps) => {
  const [groupedBlueprint, setGroupedBlueprint] = useState<GroupedBlueprint>(
    () => groupBlueprintItems(blueprint)
  );

  return (
    <div className="font-sans">
      <div className="">
        {groupedBlueprint.map((group, index) => (
          <div key={index} className="bg-gray-50 p-4 mb-4 space-y-6 rounded">
            {group.map((blueprintItem, index) => (
              <Condition
                key={index}
                blueprintItem={blueprintItem}
                conditions={conditions}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
