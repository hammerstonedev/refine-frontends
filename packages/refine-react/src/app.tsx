import { Conditions, Blueprint } from "refine-types";
import {
  booleanCondition,
  dateCondition,
  dateWithTimeCondition,
  numericCondition,
  optionCondition,
  textCondition,
} from "refine-fixtures";
import { groupBlueprintItems, QueryBuilder } from "./tailwind/components";
import { useState } from "react";

const blueprint: Blueprint = [
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "eq",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "eq",
      value: "123",
    },
  },
  {
    depth: 0,
    type: "conjunction",
    word: "or",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "eq",
      value: "123",
    },
  },
];

const conditions: Conditions = [
  optionCondition,
  booleanCondition,
  textCondition,
  dateCondition,
  dateWithTimeCondition,
  numericCondition,
];

const App = () => {
  const [debugBlueprint, setDebugBlueprint] = useState(() =>
    groupBlueprintItems(blueprint)
  );

  return (
    <div>
      <QueryBuilder
        blueprint={blueprint}
        conditions={conditions}
        onChange={(groupedBlueprint) => setDebugBlueprint(groupedBlueprint)}
      />
      <pre className="text-xs">{JSON.stringify(debugBlueprint, null, 2)}</pre>
    </div>
  );
};

export default App;
