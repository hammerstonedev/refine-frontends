import { useState } from "react";
import type { Condition, Blueprint } from "@hammerstone/refine-react";
import { QueryBuilder, tailwindFlavor } from "@hammerstone/refine-react";
import {
  booleanCondition,
  dateCondition,
  dateWithTimeCondition,
  numericCondition,
  optionCondition,
  textCondition,
} from "refine-core/fixtures";

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

const conditions: Condition[] = [
  optionCondition,
  booleanCondition,
  textCondition,
  dateCondition,
  dateWithTimeCondition,
  numericCondition,
];

const App = () => {
  const [debugBlueprint, setDebugBlueprint] = useState(blueprint);

  return (
    <div>
      <QueryBuilder
        blueprint={blueprint}
        conditions={conditions}
        flavor={tailwindFlavor}
        onChange={(blueprint) => setDebugBlueprint(blueprint)}
      />
      <pre className="text-xs">{JSON.stringify(debugBlueprint, null, 2)}</pre>
    </div>
  );
};

export default App;
