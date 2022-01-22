import { Condition } from "../../../types";
import { useQueryBuilder } from "../query-builder/use-query-builder";

export const useCondition = (id: Condition["id"]) => {
  const { conditions } = useQueryBuilder();

  const condition = conditions.find((condition) => condition.id === id);

  if (!condition) {
    throw new Error(`Invalid condition id ${id} passed to useCondition.`);
  }

  return condition;
};
