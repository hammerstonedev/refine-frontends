import { useMemo } from "react";
import { ConditionComponentName } from ".";
import type { Conditions, CriterionBlueprintItem } from "../../../types";
import { BasicCondition } from "./basic-condition";

const conditionComponents: Partial<{
  [conditionName in ConditionComponentName]: any;
}> = {
  OptionCondition: BasicCondition,
  TextCondition: BasicCondition,
  NumericCondition: BasicCondition,
};

export const Condition = ({
  blueprintItem,
  conditions,
}: {
  blueprintItem: CriterionBlueprintItem;
  conditions: Conditions;
}) => {
  const condition = useMemo(
    () =>
      conditions.find(
        (condition) => condition.id === blueprintItem.condition_id
      ),
    [blueprintItem.condition_id]
  );

  const Component = useMemo(() => {
    if ((condition?.component ?? "") in conditionComponents) {
      // @ts-expect-error this should go away when all components have been handled
      return conditionComponents[condition.component];
    }
    return null;
  }, [condition]);

  if (!Component) {
    return <div className="text-red-500">Condition component not found.</div>;
  }

  return <Component condition={condition} blueprintItem={blueprintItem} />;
};
