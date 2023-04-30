import { useEffect, useState } from "react";
import type { Blueprint, Condition, RefineErrors } from "@hammerstone/refine-react";
import { QueryBuilder, extendFlavor } from "@hammerstone/refine-react";
import defaultFlavor from "@hammerstone/refine-react/flavors/default";
import "@hammerstone/refine-react/dist/flavors/default.css";
import {
  basicBlueprint,
  booleanCondition,
  dateCondition,
  dateWithTimeCondition,
  kitchenSinkBlueprint,
  numericCondition,
  optionCondition,
  textCondition,
} from "refine-core/fixtures";

const conditions: Condition[] = [
  optionCondition,
  textCondition,
  booleanCondition,
  dateCondition,
  dateWithTimeCondition,
  numericCondition,
];

const errors: RefineErrors = { 2: [{ id: 1234, message: "Test error!" }] };

const flavors = [
  { name: "base", flavor: {} },
  {
    name: "default",
    flavor: defaultFlavor,
  },
  {
    name: "extended",
    flavor: extendFlavor(defaultFlavor, {
      group: {
        // Extend a className
        className: [defaultFlavor.group?.className, "text-red-500"].join(" "),
      },
      addGroupButton: {
        component: (props) => <button {...props}>Add an or!!!</button>,
      },
    }),
  },
];

const searchParams = new URL(window.location.href).searchParams;

const blueprintFromUrl: Blueprint = (() => {
  const blueprintParam = searchParams.get("blueprint");

  if (blueprintParam) {
    try {
      return JSON.parse(blueprintParam);
    } catch {}
  }

  return [];
})();

const blueprints = [
  {
    name: "custom",
    blueprint: blueprintFromUrl,
  },
  {
    name: "basic",
    blueprint: basicBlueprint,
  },
  {
    name: "blank",
    blueprint: [],
  },
  {
    name: "kitchen sink",
    blueprint: kitchenSinkBlueprint,
  },
];

const capitalise = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const INITIAL_FLAVOR = "default";
const INITIAL_BLUEPRINT = "kitchen sink";

const App = () => {
  const [chosenFlavor, setChosenFlavor] = useState(
    () => flavors.find((flavor) => flavor.name === INITIAL_FLAVOR) ?? flavors[0]
  );
  const [chosenBlueprint, setChosenBlueprint] = useState(() => {
    if (searchParams.has("blueprint")) {
      return blueprints.find((blueprint) => blueprint.name === "custom")!;
    }

    return blueprints.find((blueprint) => blueprint.name === INITIAL_BLUEPRINT) ?? blueprints[0];
  });
  const [debugBlueprint, setDebugBlueprint] = useState(blueprints[0].blueprint);

  useEffect(() => {
    if (chosenBlueprint) {
      setDebugBlueprint(chosenBlueprint.blueprint);
    }
  }, [chosenBlueprint?.name]);

  return (
    <div className="space-y-6">
      <div className="flex space-x-24 bg-indigo-900 text-white p-4">
        <div>
          Change Flavor
          {flavors.map((flavor, index) => (
            <div key={flavor.name} className="flex items-center space-x-2">
              <input
                type="radio"
                name="flavor"
                value={flavor.name}
                checked={flavor.name === chosenFlavor.name}
                onChange={(event) => setChosenFlavor(flavors[index])}
              />
              <label>{capitalise(flavor.name)}</label>
            </div>
          ))}
        </div>
        <div>
          Change Blueprint
          {blueprints.map((blueprint, index) => (
            <div key={blueprint.name}>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="blueprint"
                  value={blueprint.name}
                  checked={blueprint.name === chosenBlueprint.name}
                  onChange={(event) => setChosenBlueprint(blueprints[index])}
                />
                <span>{capitalise(blueprint.name)}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <QueryBuilder
        key={`${chosenFlavor.name}-${chosenBlueprint.name}`}
        blueprint={chosenBlueprint.blueprint}
        conditions={conditions}
        errors={errors}
        flavor={chosenFlavor.flavor}
        onChange={(blueprint) => setDebugBlueprint(blueprint)}
      />
      <pre className="text-xs">{JSON.stringify(debugBlueprint, null, 2)}</pre>
    </div>
  );
};

export default App;
